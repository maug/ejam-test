import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store, { Deployment, Template } from './redux/store';
import { getDeployments, getTemplates } from "./utils/backend";
import * as actions from "./redux/actions";
import { setDeployments } from "./redux/actions";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

getTemplates().then((templates: Template[]) => store.dispatch(actions.setTemplates(templates)));
getDeployments().then((deployments: Deployment[]) => store.dispatch(setDeployments(deployments)));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
