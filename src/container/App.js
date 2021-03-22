import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import UserSignUpPage from '../pages/UserSignUpPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';

function App() {
  return (
    <div className="row">
      <div className="col">
          <UserSignUpPage />
      </div>
      <div className="col">
          <LoginPage />
      </div>
      <LanguageSelector />
    </div>
  );
}

export default App;
