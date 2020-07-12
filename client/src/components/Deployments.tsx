import React from 'react';
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
import { Deployment } from "../redux/store";
import { CountdownTimer } from "./CountdownTimer";

export function Deployments({ handleDeleteDeployment }: { handleDeleteDeployment: (d: Deployment) => void }) {
  const dispatch = useDispatch();
  const deployments = useSelector((state: AppState): AppState['deployments'] => state.deployments);
  const countdowns = useSelector((state: AppState): AppState['countdowns'] => state.countdowns);

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
              step={9}
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
          </TableCell>
          <TableCell>{dep.version}</TableCell>
          <TableCell style={ { wordBreak: 'break-word'} }>{dep.url}</TableCell>
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

