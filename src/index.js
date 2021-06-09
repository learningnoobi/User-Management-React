import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true;
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;

//     if (typeof error.response === 'undefined') {
//       alert(
//         'A server/network error occurred. ' +
//         'Looks like CORS might be the problem. ' +
//         'Sorry about this - we will get it fixed shortly.'
//       );
//       return Promise.reject(error);
//     }
//   }
// )


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
