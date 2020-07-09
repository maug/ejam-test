import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import { Deployment, DeploymentRaw, Template } from "./redux/store";
import { AppState } from "./redux/reducers";
import { DeploymentForm } from "./components/DeploymentForm";
import * as actions from "./redux/actions";
import { Deployments } from "./components/Deployments";
import { addDeployment, deleteDeployment } from "./utils/backend";



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

  async function handleDeleteDeployment(deployment: Deployment) {
    try {
      const deleted = await deleteDeployment(deployment._id);
      if (deleted) {
        console.log('DELETED', deleted);
        dispatch(actions.deleteDeployment(deployment))
      }
    } catch (e) {
      console.error('No i chuj');
    }
  }

  if (!isInitialized) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Container maxWidth="md">
          <DeploymentForm handleAddDeployment={handleAddDeployment} />
          <Deployments handleDeleteDeployment={handleDeleteDeployment}/>
        </Container>
      </div>
    );
  }
}


export default App;
