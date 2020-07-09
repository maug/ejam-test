import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Typography } from "@material-ui/core";
import { Deployment, DeploymentRaw, Template } from "./redux/store";
import { AppState } from "./redux/reducers";
import { DeploymentForm } from "./components/DeploymentForm";
import * as actions from "./redux/actions";
import { Deployments } from "./components/Deployments";
import { addDeployment, deleteDeployment } from "./utils/backend";
import { AlertDialog } from "./components/AlertDialog";



function App() {
  const dispatch = useDispatch();
  const isInitialized = useSelector((state: AppState) => state.isInitialized);
  const error = useSelector((state: AppState) => state.error);

  async function handleAddDeployment(newValue: DeploymentRaw) {
    try {
      const deployment = await addDeployment(newValue);
      dispatch(actions.addDeployment(deployment));
    } catch (e) {
      dispatch(actions.showError(e.toString()));
    }
  }

  async function handleDeleteDeployment(deployment: Deployment) {
    try {
      const deleted = await deleteDeployment(deployment._id);
      if (deleted === true) {
        dispatch(actions.deleteDeployment(deployment));
      }
    } catch (e) {
      dispatch(actions.showError(e.toString()));
    }
  }

  if (!isInitialized) {
    return (
      <Grid container alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
        <Grid item><Typography><h1>Loading...</h1></Typography></Grid>
      </Grid>
    );
  } else {
    return (
      <div>
        <Container maxWidth="md">
          <DeploymentForm handleAddDeployment={handleAddDeployment} />
          <Deployments handleDeleteDeployment={handleDeleteDeployment}/>
        </Container>
        <AlertDialog
          open={!!error}
          handleClose={() => dispatch(actions.showError(false))}
          title="ERROR"
          text={error}
        />
      </div>
    );
  }
}


export default App;
