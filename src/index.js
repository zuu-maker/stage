import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import {BrowserRouter as Router ,Switch, Route,useLocation} from 'react-router-dom'

import reportWebVitals from './reportWebVitals';
import App from "./App";
import { StateProvider } from './contexts/StateProvider';
import reducer, { initialState } from './contexts/reducer';


ReactDOM.render(
  <StateProvider initialState={initialState} reducer ={reducer}>
  <Router>
    <App />
  </Router>
  </StateProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
