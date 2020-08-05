import React from 'react';
import classes from './Burger.module.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let transform = Object.keys(props.ingredients).map((iKey) => {
        return [...Array(props.ingredients[iKey])].map((_, i) => {
            return <BurgerIngredient key={iKey + i} type={iKey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    console.log(transform)
    if (transform.length <= 0) {
        transform = <p>please add some ingredients</p>
    }
    return (

        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transform}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger;