import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true;


ReactDOM.render(
  <React.StrictMode>

    <App />

  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
