import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Deployment, Template } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./redux/reducers";
import { DeploymentForm } from "./components/DeploymentForm";
import { addDeployment } from "./redux/actions";
import { Deployments } from "./components/Deployments";

function App() {
  const dispatch = useDispatch();
  const isInitialized = useSelector<AppState>((state => state.isInitialized));
  const templates = useSelector((state: AppState): Template[] => state.templates);
  console.log('RENDERING', isInitialized, templates);
  if (!isInitialized) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <DeploymentForm handleAddDeployment={(deployment: Deployment) => dispatch(addDeployment(deployment))} />
        <Deployments/>
      </div>
    );
  }
}


export default App;
