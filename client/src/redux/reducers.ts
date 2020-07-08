import { Deployment, Template } from "./store";
import { AppActionTypes, SET_TEMPLATES } from "./actions";

export interface AppState {
  isInitialized: boolean,
  templates: Template[],
  deployments: Deployment[],
}

const defaultState: AppState = {
  isInitialized: false,
  templates: [],
  deployments: [],
}

function appReducer(state: AppState = defaultState, action: AppActionTypes): AppState {
  console.log('appReducer', action);
  switch (action.type) {
    case SET_TEMPLATES: {
      return {
        ...state,
        templates: action.templates,
        isInitialized: true,
      }
    }
    default:
      return state;
  }
}

export { appReducer };
