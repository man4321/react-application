import React from 'react';

import classes from './Order.module.css'
import { object } from 'prop-types';
const Order = (props) => {
    
    let ingredients = Object.keys(props.ingredients).map(inKey=> {
        return <span  style={{ textTransform: 'capitalize',
        margin:'0 8px',
        display:'inline-block',
        padding:'5px',
        border:'1px solid #ccc',
        boxShadow:"0 2px 3px #eee"}}>
            {inKey} ({props.ingredients[inKey]})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingrediantes: {ingredients} </p>
            <p>Total Price <strong>INR {props.price}</strong></p>
        </div>
    )
}

export default Order