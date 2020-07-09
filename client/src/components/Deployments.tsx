import React, { useState } from 'react';
import { useSelector } from "react-redux";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { Deployment, Template } from "../redux/store";
import { AppState } from "../redux/reducers";
import { Unpacked } from "../types";

export function Deployments() {
  const deployments = useSelector((state: AppState): Deployment[] => state.deployments);

  return (
    <div>
      <ul>
        {deployments.map(d => <li>{d.templateName}</li>)}
      </ul>
    </div>
  );
}

