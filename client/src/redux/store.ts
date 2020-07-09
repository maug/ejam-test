import { createStore } from "redux";
import { appReducer } from "./reducers";

export interface Template {
  name: string,
  versions: string[];
}

export interface DeploymentRaw {
  url: string,
  templateName: string,
  version: string,
}

export interface Deployment extends DeploymentRaw {
  _id: string,
  deployedAt: string,
}

const store = createStore(appReducer);

export default store;
