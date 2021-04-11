import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './bootstrap-override.scss';
import './i18n';
import App from './container/App';
//import AuthenticationContext, { Authentication } from './shared/AuthenticationContext';
import {Provider} from 'react-redux';
import {createStore} from 'redux';


const loggedInState = {
  isLoggedIn: true,
  username: "mert",
  displayName: "mert_p",
  image: null,
  password: 'Pasword'
};


const defaultState ={
  isLoggedIn: false,
  username: undefined,
  displayName: undefined,
  image: undefined,
  password: undefined
}

const reducer = (state = { ...defaultState}, action) => {
  if (action.type == 'logout-success') {
    return defaultState;
  }
  return state;
}

const store = createStore(reducer , loggedInState);

ReactDOM.render(
 <Provider store = {store}>
    <App />
</Provider> 
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
