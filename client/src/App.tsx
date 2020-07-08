import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getTemplates } from "./utils/backend";
import { Template } from "./redux/store";
import store from './redux/store';
import { setTemplates } from "./redux/actions";
import { useSelector } from "react-redux";
import { AppState } from "./redux/reducers";

function App() {
  const isInitialized = useSelector<AppState>((state => state.isInitialized));
  const templates = useSelector((state: AppState): Template[] => state.templates);
  console.log('RENDERING', isInitialized, templates);
  if (!isInitialized) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Zesraj się <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wypierdalaj kozi bobku!
          </a>
          <ul>
            {templates.map(t => (
              <li key={t.name}>{t.name}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

getTemplates().then((templates: Template[]) => store.dispatch(setTemplates(templates)));

export default App;
