import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register'
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

ReactDOM.render(
  <React.StrictMode>
    {/* <Register/> */}
     {/* <Login/> */}
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();