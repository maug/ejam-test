import { Deployment, Template } from "./store";
import { ADD_DEPLOYMENT, AppActionTypes, DELETE_DEPLOYMENT, SET_DEPLOYMENTS, SET_TEMPLATES } from "./actions";

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
      };
    }
    case SET_DEPLOYMENTS: {
      return {
        ...state,
        deployments: action.deployments,
      };
    }
    case ADD_DEPLOYMENT: {
      return {
        ...state,
        deployments: [action.deployment].concat(state.deployments),
      };
    }
    case DELETE_DEPLOYMENT: {
      return {
        ...state,
        deployments: state.deployments.filter(d => d !== action.deployment),
      };
    }
    default:
      return state;
  }
}

export { appReducer };
