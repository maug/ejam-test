import { createStore } from "redux";
import { appReducer } from "./reducers";

export interface Template {
  name: string,
  versions: string[];
}

export interface Deployment {
  url: string,
  templateName: string,
  version: string,
  deployedAt: Date,
}

const store = createStore(appReducer);

export default store;
