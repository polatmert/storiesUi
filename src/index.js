import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UsersignUpPage from './pages/UserSignUpPage';
import LoginPage from './pages/LoginPage';
import * as serviceWorker from './serviceWorker';
import './bootstrap-override.scss';
import './i18n';
import LanguageSelector from './components/LanguageSelector';
import UserSignUpPage from './pages/UserSignUpPage';
import ApiProgress from './shared/ApiProgress';

ReactDOM.render(
  <div>
    <ApiProgress>
      <UsersignUpPage />
    </ApiProgress>
    <LanguageSelector />
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
