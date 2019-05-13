import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const attachedClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        attachedClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case 'input':
            inputElement =
                <input
                    className={attachedClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />;
            break;
        case 'textarea':
            inputElement =
                <textarea
                    className={attachedClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />;
            break;
        case 'select':
            inputElement = (
                <select
                    className={attachedClasses.join(' ')}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option =>
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    )}
                </select>);
            break;
        default:
            inputElement =
                <input
                    className={attachedClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />;
    }

    return (
        <div className={classes.InputElement}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;