import React from 'react';
import { withTranslation } from 'react-i18next';
import { signup, changeLanguage } from '../api/apiCalls';
import Input from '../components/input';

class UserSignUpPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
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

    onChangeLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    };

    onClickSignUp = async event => {
        event.preventDefault();

        const { username, displayName, password } = this.state;

        const body = {
            username: username,
            displayName: displayName,
            password: password
        };
        this.setState({ pendingApiCall: true });

        try {
            const response = await signup(body);
        } catch (error) {
            if (error.response.data.validationErrors)
                this.setState({ errors: error.response.data.validationErrors });
        }

        this.setState({ pendingApiCall: false });

    };

    render() {
        const { pendingApiCall, errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        const { t } = this.props;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input name='username' label={t('Username')} error={username} onChange={this.onChange}></Input>
                    <Input name='displayName' label={t('Display Name')} error={displayName} onChange={this.onChange}></Input>
                    <Input name='password' label={t('Password')} error={password} onChange={this.onChange} type="password"></Input>
                    <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeat} onChange={this.passwordRepeat} onChange={this.onChange} type="password"></Input>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={this.onClickSignUp} disabled={pendingApiCall || passwordRepeat !== undefined} >
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} {t('Sign Up')}
                        </button>
                    </div>
                    <div>
                        <img src="https://www.countryflags.io/tr/flat/24.png" alt="Turkish Flag" onClick={() => this.onChangeLanguage('tr')} style={{cursor: 'pointer'}}></img>
                        <img src="https://www.countryflags.io/us/flat/24.png" alt="USA Flag" onClick={() => this.onChangeLanguage('en')} style = {{cursor: 'pointer'}}></img>
                    </div>
                </form>
            </div>
        );
    }
}

//Higher Order Component
const UserSignUpPageWithTranslation = withTranslation()(UserSignUpPage);

export default withTranslation()(UserSignUpPage);