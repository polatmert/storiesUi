import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import UserSignUpPage from '../pages/UserSignUpPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import TopBar from '../components/TopBar';
import {connect } from 'react-redux';

class App extends React.Component {

  render() {
    const {isLoggedIn} = this.props;
    return (
      <div>
        <Router>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && (
              <Route
                path="/login"
                component={LoginPage} />
            )}
            <Route path="/signup" component={UserSignUpPage} />
            <Route path="/user/:username" component ={ UserPage }  />
            <Redirect to="/" />
          </Switch>
        </Router>
        <LanguageSelector />
      </div>
    );
  }
}

const mapStateToProps = (store) =>{

  return{
      isLoggedIn:store.isLoggedIn,
  };
};


export default connect(mapStateToProps)(App);