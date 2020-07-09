import { Deployment, Template } from "./store";

// Action types

const SET_TEMPLATES = 'SET_TEMPLATES'
const SET_DEPLOYMENTS = 'SET_DEPLOYMENTS'
const ADD_DEPLOYMENT = 'ADD_DEPLOYMENT'
const DELETE_DEPLOYMENT = 'DELETE_DEPLOYMENT'

// Action creators

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

export type AppActionTypes = SetTemplatesAction | SetDeploymentsAction | AddDeploymentAction | DeleteDeploymentAction;
export {
  SET_TEMPLATES, setTemplates,
  SET_DEPLOYMENTS, setDeployments,
  ADD_DEPLOYMENT, addDeployment,
  DELETE_DEPLOYMENT, deleteDeployment,
};
