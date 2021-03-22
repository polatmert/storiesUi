import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import UserSignUpPage from '../pages/UserSignUpPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';

function App() {
  return (
    <div className="row">
      <div className="col">
        <ApiProgress path="/api/1.0/users">
          <UserSignUpPage />
        </ApiProgress>
      </div>
      <div className="col">
        <ApiProgress path="/api/1.0/auth">
          <LoginPage />
        </ApiProgress>
      </div>
      <LanguageSelector />
    </div>
  );
}

export default App;
