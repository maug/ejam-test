import { Deployment, Template } from "./store";
import {
  ADD_DEPLOYMENT,
  AppActionTypes,
  DELETE_DEPLOYMENT,
  SET_DEPLOYMENTS,
  SET_INITIALIZED,
  SET_TEMPLATES,
  SHOW_ERROR,
  UPDATE_COUNTDOWN
} from "./actions";

export interface AppState {
  isInitialized: boolean,
  error: string,
  templates: Template[],
  deployments: Deployment[],
  countdowns: Record<string, number>;
}

const defaultState: AppState = {
  isInitialized: false,
  error: '',
  templates: [],
  deployments: [],
  countdowns: {},
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
    case SET_INITIALIZED: {
      return {
        ...state,
        isInitialized: action.initialized,
      };
    }
    case SET_TEMPLATES: {
      return {
        ...state,
        templates: action.templates,
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
    case UPDATE_COUNTDOWN: {
      return {
        ...state,
        countdowns: { ...state.countdowns, [action.deployment_id]: action.countdown },
      };
    }
    default:
      return state;
  }
}

export { appReducer };
