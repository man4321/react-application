import React from 'react';
import clasess from './DrawerToggle.module.css'
const DrawerToggle=(props)=>(
    <div onClick={props.menuBtn} className={clasess.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default DrawerToggle;