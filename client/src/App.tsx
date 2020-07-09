import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Deployment, DeploymentRaw, Template } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./redux/reducers";
import { DeploymentForm } from "./components/DeploymentForm";
import * as actions from "./redux/actions";
import { Deployments } from "./components/Deployments";
import { addDeployment } from "./utils/backend";



function App() {
  const dispatch = useDispatch();
  const isInitialized = useSelector<AppState>((state => state.isInitialized));
  const templates = useSelector((state: AppState): Template[] => state.templates);
  console.log('RENDERING', isInitialized, templates);

  async function handleAddDeployment(newValue: DeploymentRaw) {
    try {
      const deployment = await addDeployment(newValue)
      dispatch(actions.addDeployment(deployment))
    } catch (e) {
      console.error('No i chuj');
    }
  }

  if (!isInitialized) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <DeploymentForm handleAddDeployment={handleAddDeployment} />
        <Deployments/>
      </div>
    );
  }
}


export default App;
