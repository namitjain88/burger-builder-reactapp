import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

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
        }
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

    render() {
        let formElementArr = [];
        for (let key in this.state.controls) {
            formElementArr.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementArr.map(formElement => {
                return <Input key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)}
                />
            })}
        </form>);
        return (
            <div className={classes.Auth}>
                {form}
                <Button btnType='Success'>SUBMIT</Button>
            </div>
        );
    }
}

export default Auth;