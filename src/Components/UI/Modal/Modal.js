import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import BackDrop from '../BackDrop/BackDrop';
import {Link} from 'react-router-dom'
class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show!==this.props.show || nextProps.children!==this.props.children
    }
    componentDidUpdate(){
        console.log('modal updated!!!!')
        console.log(this.props.children)
    }
    
    render() {
        let orderSummary=<div></div>;
        if(this.props.show){
            orderSummary=<div>{this.props.children}</div>
        }
        return (
            <Aux>
                <Link to="/"> <BackDrop show={this.props.show} clicked={this.props.modalClosed} /></Link>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'trasnlateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    >
                    {orderSummary}
                   
                </div>
            </Aux>

        )
    }
}
export default Modal;