import React, { Component } from 'react';

export const Authentication = React.createContext();

class AuthenticationContext extends Component {

    state = {
        isLoggedIn: true,
        username: "mert",
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    onLoginSuccess = authState => {
        this.setState({
            //...autState, 
            username: authState.username,
            password: authState.password,
            displayName: authState.displayName,
            image: authState.image,
            isLoggedIn: true
        })
    };

    onLogoutSuccess = () => {
        this.setState({
            isLoggedIn: false,
            username: undefined
        })
    };

    render() {
        return (
            <Authentication.Provider value={{
                state: { ...this.state },
                onLoginSuccess: this.onLoginSuccess,
                onLogoutSuccess: this.onLogoutSuccess
            }}>
                {this.props.children}
            </Authentication.Provider>
        );
    }
}

export default AuthenticationContext;