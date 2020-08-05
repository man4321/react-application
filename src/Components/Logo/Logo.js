import React from 'react';

import classes from './Logo.module.css';
import image from '../../assets/Image/burger-logo.png';
const Logo =(props)=>(
    <div className={classes.BurgerLogo} style={{height:props.height}}>
        <img src={image} alt="Burger Logo"/>
    </div>
)

export default Logo