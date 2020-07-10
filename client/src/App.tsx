import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { addDeployment, deleteDeployment, getDeployments, getTemplates } from "./utils/backend";
import * as actions from "./redux/actions";
import { AppState } from "./redux/reducers";
import { Deployment, DeploymentRaw, Template } from "./redux/store";
import { AlertDialog } from "./components/AlertDialog";
import { Deployments } from "./components/Deployments";
import { DeploymentForm } from "./components/DeploymentForm";

function App() {
  const dispatch = useDispatch();
  const isInitialized = useSelector((state: AppState) => state.isInitialized);
  const error = useSelector((state: AppState) => state.error);

  useEffect(() => {
    getTemplates()
      .then((templates: Template[]) => dispatch(actions.setTemplates(templates)))
      .then(() => getDeployments())
      .then((deployments: Deployment[]) => dispatch(actions.setDeployments(deployments)))
      .then(() => dispatch(actions.setInitialized(true)))
      .catch(err => dispatch(actions.showError(err.message)));
  }, []);

  async function handleAddDeployment(newValue: DeploymentRaw) {
    try {
      const deployment = await addDeployment(newValue);
      dispatch(actions.addDeployment(deployment));
      dispatch(actions.updateCountdown(deployment._id, Math.round(Math.random() * 25000) + 5000));
    } catch (e) {
      dispatch(actions.showError(e.message));
    }
  }

  async function handleDeleteDeployment(deployment: Deployment) {
    try {
      const deleted = await deleteDeployment(deployment._id);
      if (deleted === true) {
        dispatch(actions.deleteDeployment(deployment));
      }
    } catch (e) {
      dispatch(actions.showError(e.message));
    }
  }

  if (!isInitialized) {
    return (
      <Grid container alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
        <Grid item>
          <Box m={4}>
            <Typography color={error ? 'error' : 'inherit'} variant="h4">{error ? error : 'Loading...'}</Typography>
          </Box>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <div>
        <Container maxWidth="md">
          <Box py={5}>
            <DeploymentForm handleAddDeployment={handleAddDeployment} />
          </Box>
          <Box>
            <Deployments handleDeleteDeployment={handleDeleteDeployment}/>
          </Box>
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
