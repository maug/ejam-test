import { Deployment, Template } from "../redux/store";

export function getTemplates(): Promise<Template[]> {
  return httpGet('/api/templates');
}

export function getDeployments(): Promise<Deployment[]> {
  return httpGet('/api/deployments');
}

export function addDeployment({ templateName, version, url }:
  { templateName: string, version: string, url: string }): Promise<Deployment> {
  return httpPost('/api/deployments', { templateName, version, url });
}

export function deleteDeployment(id: string): Promise<boolean> {
  return httpDelete('/api/deployments/' + id);
}

async function httpGet(path: string): Promise<any> {
  const response = await fetch(path, getOptions('GET'));
  await checkForError(response);
  return response.json();
}

async function httpPost(path: string, data: any): Promise<any> {
  const response = await fetch(path, getOptions('POST', data));
  await checkForError(response);
  return response.json();
}

async function httpDelete(path: string): Promise<any> {
  const response = await fetch(path, getOptions('DELETE'));
  await checkForError(response);
  return response.json();
}

async function httpPut(path: string, data: any): Promise<any> {
  const response = await fetch(path, getOptions('PUT', data));
  await checkForError(response);
  return response.json();
}

async function checkForError(response: Response): Promise<void> {
  console.log('RSSS', response);
  if (!response.ok) {
    let errorMsg = await response.text();
    try {
      errorMsg = JSON.parse(errorMsg).error;
    } catch (e) {
      // not json error response, strip html tags from error message
      errorMsg = errorMsg.replace(/<[^>]+>/g, '')
    }
    throw new Error(errorMsg);
  }
}

interface Options {
  dataType: string,
  method: string,
  headers: Record<string, string>,
  body?: string;
}

function getOptions(verb: string, data?: any): Options {
  var options: Options = {
    dataType: 'json',
    method: verb,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return options;
}
