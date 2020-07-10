import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { AppState } from "../redux/reducers";
import * as actions from "../redux/actions";
import { getDeployments } from "../utils/backend";
import { Deployment } from "../redux/store";
import { setDeployments } from "../redux/actions";
import { CountdownTimer } from "./CountdownTimer";

export function Deployments({ handleDeleteDeployment }: { handleDeleteDeployment: (d: Deployment) => void }) {
  const dispatch = useDispatch();
  const deployments = useSelector((state: AppState): AppState['deployments'] => state.deployments);
  const countdowns = useSelector((state: AppState): AppState['countdowns'] => state.countdowns);

  useEffect(() => {
    getDeployments().then((deployments: Deployment[]) => dispatch(setDeployments(deployments)));
  }, []);

  function handleCountdownEnd(deployment_id: string): void {
    dispatch(actions.updateCountdown(deployment_id, 0));
  }

  function renderDeployment(dep: Deployment) {
    if (countdowns[dep._id]) {
      return (
        <TableRow key={dep._id}>
          <TableCell component="th" scope="row" colSpan={5}>
            <CountdownTimer
              countdownFrom={countdowns[dep._id]}
              handleEnd={() => handleCountdownEnd(dep._id)}
            />
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key={dep._id}>
          <TableCell component="th" scope="row">
            {dep.templateName}
            {countdowns[dep._id] ?
              <CountdownTimer
                countdownFrom={countdowns[dep._id]}
                handleEnd={() => handleCountdownEnd(dep._id)}
              />
              : null
            }
          </TableCell>
          <TableCell>{dep.version}</TableCell>
          <TableCell>{dep.url}</TableCell>
          <TableCell>
            {new Date(dep.deployedAt).toLocaleString('en-US')}
          </TableCell>
          <TableCell>
            <Button
              onClick={() => handleDeleteDeployment(dep)}
              variant="text"
              color="secondary"
              size="small"
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      );
    }
  }

  return (
    <div>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Template name</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Deployed</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {deployments.map(dep => renderDeployment(dep))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

