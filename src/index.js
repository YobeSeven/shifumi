import React from 'react';
import ReactDOM from 'react-dom/client';

import "./sass/app.scss";

import * as App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App.App />
  </React.StrictMode>
);
