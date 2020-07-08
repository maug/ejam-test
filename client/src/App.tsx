import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getTemplates } from "./utils/backend";
import { Template } from "./redux/store";
import store from './redux/store';
import { setTemplates } from "./redux/actions";
import { useSelector } from "react-redux";
import { AppState } from "./redux/reducers";
import { DeploymentForm } from "./components/DeploymenForm";

function App() {
  const isInitialized = useSelector<AppState>((state => state.isInitialized));
  const templates = useSelector((state: AppState): Template[] => state.templates);
  console.log('RENDERING', isInitialized, templates);
  if (!isInitialized) {
    return <div>Loading...</div>;
  } else {
    return (
      <DeploymentForm />
    );
  }
}

getTemplates().then((templates: Template[]) => store.dispatch(setTemplates(templates)));

export default App;
