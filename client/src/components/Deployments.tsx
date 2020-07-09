import React, { useState } from 'react';
import { useSelector } from "react-redux";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";

import { Deployment, DeploymentRaw, Template } from "../redux/store";
import { AppState } from "../redux/reducers";
import { Unpacked } from "../types";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    // maxWidth: 800,
  },
});

export function Deployments({ handleDeleteDeployment }: { handleDeleteDeployment: (d: Deployment) => void }) {
  const deployments = useSelector((state: AppState): Deployment[] => state.deployments);

  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
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
            {deployments.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.templateName}
                </TableCell>
                <TableCell>{row.version}</TableCell>
                <TableCell>{row.url}</TableCell>
                <TableCell>
                  {new Date(row.deployedAt).toLocaleDateString('en-US')}
                  {' '}
                  {new Date(row.deployedAt).toLocaleTimeString('en-US')}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteDeployment(row)}
                    variant="text"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

