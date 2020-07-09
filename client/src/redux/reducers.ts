import { Deployment, Template } from "./store";
import {
  AppActionTypes,
  ADD_DEPLOYMENT,
  DELETE_DEPLOYMENT,
  SET_DEPLOYMENTS,
  SET_TEMPLATES,
  SHOW_ERROR
} from "./actions";

export interface AppState {
  isInitialized: boolean,
  error: string,
  templates: Template[],
  deployments: Deployment[],
}

const defaultState: AppState = {
  isInitialized: false,
  error: '',
  templates: [],
  deployments: [],
}

function appReducer(state: AppState = defaultState, action: AppActionTypes): AppState {
  console.log('appReducer', action);
  switch (action.type) {
    case SHOW_ERROR: {
      return {
        ...state,
        error: action.text,
      };
    }
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
