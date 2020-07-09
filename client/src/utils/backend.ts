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

// getDeployments
//
// addDeployment
//
// deleteDeployment

function httpGet(path: string): Promise<any> {
  return fetch(path, getOptions('GET'))
    .then(response => response.json())
    .catch(reason => {
      alert(reason);
      console.error('ERROR IN API CALL', reason);
      throw new Error(reason);
    });
}


function httpPost(path: string, data: any): Promise<any> {
  return fetch(path, getOptions('POST', data))
    .then(response => {console.log('RES', response); return response;})
    .then(response => response.json())
    .catch(reason => {
      alert(reason);
      console.error('ERROR IN API CALL', reason);
      throw new Error(reason);
    });
}


function httpPut(path: string, data: any) {
  return fetch(path, getOptions('PUT', data));
}


function httpDelete(path: string) {
  return fetch(path, getOptions('DELETE'));
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
