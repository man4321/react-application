import React from 'react';
import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    let InputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touch) {
        InputClasses.push(classes.Invalid)
    }
    switch (props.elementtype) {
        case 'input':
            inputElement = <input
                className={InputClasses.join(' ')}
                {...props.elementconfig} value={props.value} onChange={props.changed} />
            break;
        case 'textarea':
            inputElement = <textarea
                className={InputClasses.join(' ')}
                {...props.elementconfig}
                value={props.value} onChange={props.changed} />
            break;
        case 'select':
            inputElement = (
                <select
                    className={InputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementconfig.options.map(option => (
                        <option key={option.value} value={option.value} >
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
            break;

        default:
            inputElement = <input
                className={InputClasses.join(' ')}
                {...props.elementconfig}
                value={props.value}
                 onChange={props.changed} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label} {...props} >{props.label}</label>
            {inputElement}
        </div>

    )
}

export default input;