import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {APP_MODE} from './App';
import reportWebVitals from './reportWebVitals';

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

ReactDOM.render(
  <React.StrictMode>
    <App mode={params.widget !== undefined ? APP_MODE.WIDGET : APP_MODE.PAGE }/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
