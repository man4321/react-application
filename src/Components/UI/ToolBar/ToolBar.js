import React from 'react';
import classes from './ToolBar.module.css';
import Logo from '../../Logo/Logo';

import NavigationItems from '../../Navigations/NavigationItems';
import DrawerToggle from '../../Navigations/SideDrower/DrawerToggle/DrawerToggle'
const ToolBar =(props)=>(
    <header className={classes.ToolBar}>
        
        <DrawerToggle menuBtn={props.menuBtn}/>
        <div className={classes.Logo}>
        <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
)

export default ToolBar;