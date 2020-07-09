import React, { useState } from 'react';
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { Deployment, DeploymentRaw, Template } from "../redux/store";
import { AppState } from "../redux/reducers";
import { Unpacked } from "../types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    width: 300,
  },
});

export function DeploymentForm({ handleAddDeployment }: { handleAddDeployment: (d: DeploymentRaw) => void }) {
  const templates = useSelector((state: AppState): Template[] => state.templates);
  const [template, setTemplate] = useState<Template | null>(null);
  const [version, setVersion] = useState<Unpacked<Template['versions']> | null>(null);
  const [url, setUrl] = useState<string>('');

  const classes = useStyles();

  return (
    <Box style={{textAlign: "center"}}>
      <FormControl className={classes.input}>
        <Autocomplete
          value={template}
          onChange={(event, newValue: Template | null) => {
            console.log('setting new template', newValue);
            setTemplate(newValue);
            if (version && !newValue?.versions.includes(version)) {
              setVersion(null);
            }
          }}
          options={templates}
          getOptionLabel={t => t.name}
          renderInput={(params) => <TextField {...params} label="Select template" variant="outlined" />}
        />
      </FormControl>
      <br/><br/>
      <FormControl className={classes.input}>
        <Autocomplete
          disabled={!template}
          value={version}
          onChange={(event, newValue) => {
            console.log('setting new version', newValue);
            setVersion(newValue);
          }}
          options={template ? template.versions : []}
          renderInput={(params) => <TextField {...params} label="Select version" variant="outlined" />}
        />
      </FormControl>
      <br/><br/>
      <FormControl className={classes.input}>
        <TextField
          value={url}
          onChange={(event) => {
            console.log('setting new url', event.target.value);
            setUrl(event.target.value);
          }}
          label="Enter URL"
          variant="outlined"
        />
      </FormControl>
      <br/><br/>
      <Button
        disabled={!(template && version && url)}
        onClick={() => handleAddDeployment({
          templateName: template!.name,
          version: version!,
          url,
        })}
        variant="contained"
        color="primary"
      >
        Add deployment
      </Button>
    </Box>
  );
}

