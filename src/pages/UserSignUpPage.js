import React from 'react';
import { withTranslation } from 'react-i18next';
import { signup } from '../api/apiCalls';
import Input from '../components/input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';

class UserSignUpPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    };

    onChange = event => {
        const { t } = this.props;
        const { name, value } = event.target;
        const errors = { ...this.state.errors }; //copy object
        errors[name] = undefined;
        if (name == 'password' || name == 'passwordRepeat') {
            if (name == 'password' && value != this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password mismatch');
            } else if (name == 'passwordRepeat' && value != this.state.password) {
                errors.passwordRepeat = t('Password mismatch');
            }
            else {
                errors.passwordRepeat = undefined;
            }
        }
        this.setState({
            [name]: value,
            errors
        });
    };

    onClickSignUp = async event => {
        event.preventDefault();

        const { username, displayName, password } = this.state;

        const body = {
            username: username,
            displayName: displayName,
            password: password
        };

        try {
            const response = await signup(body);
        } catch (error) {
            if (error.response.data.validationErrors)
                this.setState({ errors: error.response.data.validationErrors });
        }

    };

    render() {
        const { errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        const { t, pendingApiCall } = this.props;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input name='username' label={t('Username')} error={username} onChange={this.onChange}></Input>
                    <Input name='displayName' label={t('Display Name')} error={displayName} onChange={this.onChange}></Input>
                    <Input name='password' label={t('Password')} error={password} onChange={this.onChange} type="password"></Input>
                    <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeat} onChange={this.passwordRepeat} onChange={this.onChange} type="password"></Input>
                    <div className="text-center">
                        <ButtonWithProgress className="btn btn-primary"
                         onClick={this.onClickSignUp}
                         disabled={pendingApiCall || passwordRepeat !== undefined} 
                         pendingApiCall = {pendingApiCall}
                         text={t('Sign Up')} />
                    </div>
                </form>
            </div>
        );
    }
}

//Higher Order Component
const UserSignUpPageWithApiProgress = withApiProgress(UserSignUpPage,'/api/1.0/users'); 

const UserSignUpPageWithTranslation = withTranslation()(UserSignUpPageWithApiProgress);

export default UserSignUpPageWithTranslation;