import React from 'react';
import ToolBar from '../UI/ToolBar/ToolBar';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css'

const NavigationItems =(props)=>(
   
        <ul  className={classes.NavigationItems}>
            <NavigationItem link="/" exact >Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
)

export default NavigationItems;