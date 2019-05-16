import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    isRequired: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    isRequired: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false
    }

    inputChangeHandler = (event, inputName) => {
        const updatedControls = {
            ...this.state.controls,
            [inputName]: {
                ...this.state.controls[inputName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[inputName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup);
    }

    switchAuthHandler = () => {
        this.setState({ isSignup: !this.state.isSignup });
    }

    render() {
        let formElementArr = [];
        for (let key in this.state.controls) {
            formElementArr.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementArr.map(formElement => {
            return <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
            />
        });

        const errorMessage = this.props.error ? this.props.error.message : null;

        return (
            this.props.loading ? <Spinner /> :
                <div className={classes.Auth}>
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType='Success'>SUBMIT</Button>
                    </form>
                    <Button
                        btnType='Danger'
                        clicked={this.switchAuthHandler}>
                        SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                    </Button>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);