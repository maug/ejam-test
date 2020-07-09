/*
* action types
*/

import { Deployment, DeploymentRaw, Template } from "./store";

const SET_TEMPLATES = 'SET_TEMPLATES'
const ADD_DEPLOYMENT = 'ADD_DEPLOYMENT'

/*
 * action creators
 */

interface SetTemplatesAction {
  type: typeof SET_TEMPLATES,
  templates: Template[],
}

function setTemplates(templates: Template[]): SetTemplatesAction {
  return { type: SET_TEMPLATES, templates };
}

interface AddDeploymentAction {
  type: typeof ADD_DEPLOYMENT,
  deployment: Deployment,
}

function addDeployment(deployment: Deployment): AddDeploymentAction {
  return { type: ADD_DEPLOYMENT, deployment };
}

export type AppActionTypes = SetTemplatesAction | AddDeploymentAction;
export {
  SET_TEMPLATES, setTemplates,
  ADD_DEPLOYMENT, addDeployment,
};
