
import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './app/app.component';
import reportWebVitals from './reportWebVitals';

// CSS Global Styles
import './app/shared/styles/generic/generic-styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
