import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './App';
import ContextProvider from './context/Context';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();