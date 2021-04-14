import React, { Component } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import {connect} from 'react-redux';
import { logoutSuccess} from '../redux/authActions';

class TopBar extends Component {


//type redux'da zorunlu 

    render() {
        const { t ,username, isLoggedIn, onLogoutSuccess } = this.props;

        let links = (
            <ul className="navbar-nav ml-auto">
                <li>
                    <Link className="nav-link" to="/login">
                        {t('Login')}
                    </Link>
                </li>
                <Link className="nav-link" to="/signUp">
                    {t('Sign Up')}
                </Link>
            </ul>
        );

        if (isLoggedIn) {
            links = (
                <ul className="navbar-nav ml-auto">
                    <Link className="nav-link" to={`/user/${username}`}>
                        {username}
                    </Link>
                    <li className="nav-link" onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}>{t('Logout')}</li>
                </ul>
            )
        };

        return (
            <div className="shadow-sm bg-light mb-2">
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="80" alt="StoryLogo" />Story
                    </Link>
                    {links}
                </nav>
            </div>
        ); 
    }
}

const TopBarWithTranslation = withTranslation()(TopBar);

const mapStateToProps = (store) =>{

    return{
        isLoggedIn:store.isLoggedIn,
        username : store.username
    };

};

const mapDispatchToProps = dispatch => {
    return {
        onLogoutSuccess: () => dispatch(logoutSuccess())    
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (TopBarWithTranslation);