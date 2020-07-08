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

import { Template } from "../redux/store";
import { AppState } from "../redux/reducers";
import { Unpacked } from "../types";

export function DeploymentForm() {
  const templates = useSelector((state: AppState): Template[] => state.templates);
  const [template, setTemplate] = useState<Template | null>(null);
  const [version, setVersion] = useState<Unpacked<Template['versions']> | null>(null);
  const [url, setUrl] = useState<string>('');

  return (
    <div>
      <FormControl>
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
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select template" variant="outlined" />}
        />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <br/>
      <FormControl>
        <Autocomplete
          disabled={!template}
          value={version}
          onChange={(event, newValue) => {
            console.log('setting new version', newValue);
            setVersion(newValue);
          }}
          options={template ? template.versions : []}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select version" variant="outlined" />}
        />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <br/>
      <FormControl>
        <TextField
          value={url}
          onChange={(event) => {
            console.log('setting new url', event.target.value);
            setUrl(event.target.value);
          }}
          label="Enter URL"
          style={{ width: 300 }}
          variant="outlined"
        />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <br/>
      <Button variant="contained" color="primary" disabled={!(template && version && url)}>
        Add deployment
      </Button>
    </div>
  );
}

