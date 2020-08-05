import React  from 'react'

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems'
import classes from './SideDrawer.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import BackDrawer from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Aux'

const SideDrawer =(props)=>{
    const sideDrowShow= props.show? [classes.SideDrawer,classes.open]:[classes.SideDrawer,classes.close];

    return (
        <Aux>
            <BackDrawer show={props.show} clicked={props.SideBar}/>
        <div className={sideDrowShow.join(' ')}>
            <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav>
                <NavigationItems/>

            </nav>
        </div>
        </Aux>
    )
}

export default SideDrawer;