import { Deployment, Template } from "./store";

// Action types

const SHOW_ERROR = 'SHOW_ERROR';
const SET_TEMPLATES = 'SET_TEMPLATES';
const SET_DEPLOYMENTS = 'SET_DEPLOYMENTS';
const ADD_DEPLOYMENT = 'ADD_DEPLOYMENT';
const DELETE_DEPLOYMENT = 'DELETE_DEPLOYMENT';

// Action creators

interface ShowErrorAction {
  type: typeof SHOW_ERROR,
  text: string,
}
function showError(text: string | false): ShowErrorAction {
  return { type: SHOW_ERROR, text: typeof text === 'string' ? text : '' };
}

interface SetTemplatesAction {
  type: typeof SET_TEMPLATES,
  templates: Template[],
}
function setTemplates(templates: Template[]): SetTemplatesAction {
  return { type: SET_TEMPLATES, templates };
}

interface SetDeploymentsAction {
  type: typeof SET_DEPLOYMENTS,
  deployments: Deployment[],
}
function setDeployments(deployments: Deployment[]): SetDeploymentsAction {
  return { type: SET_DEPLOYMENTS, deployments };
}

interface AddDeploymentAction {
  type: typeof ADD_DEPLOYMENT,
  deployment: Deployment,
}
function addDeployment(deployment: Deployment): AddDeploymentAction {
  return { type: ADD_DEPLOYMENT, deployment };
}

interface DeleteDeploymentAction {
  type: typeof DELETE_DEPLOYMENT,
  deployment: Deployment,
}
function deleteDeployment(deployment: Deployment): DeleteDeploymentAction {
  return { type: DELETE_DEPLOYMENT, deployment };
}

export type AppActionTypes =
  ShowErrorAction |
  SetTemplatesAction |
  SetDeploymentsAction |
  AddDeploymentAction |
  DeleteDeploymentAction;
export {
  SHOW_ERROR, showError,
  SET_TEMPLATES, setTemplates,
  SET_DEPLOYMENTS, setDeployments,
  ADD_DEPLOYMENT, addDeployment,
  DELETE_DEPLOYMENT, deleteDeployment,
};
