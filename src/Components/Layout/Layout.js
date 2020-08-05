import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
import ToolBar from '../UI/ToolBar/ToolBar'
import SideDrawer from '../Navigations/SideDrower/SideDrawer'


class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    showSideDrawerHandler = () => {
       
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }
    render() {
        return (
            <Aux>
                <ToolBar menuBtn={this.showSideDrawerHandler} />
                <SideDrawer show={this.state.showSideDrawer}
                    SideBar={this.showSideDrawerHandler} />
                <main className={classes.layout}>
                    {this.props.children}

                </main>
            </Aux>

        )
    }
}
export default Layout;