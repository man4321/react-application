import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button'
import Classes from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => (
    <div className={Classes.CheckoutSummary}>
        <h1>Tasty Burger is ready</h1>
        {console.log(props.ingredients)}

        <div style={{ width: '100%', margin: "auto" }}>

            <Burger ingredients={props.ingredients}/>
        </div>
        <Button btnType="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>

    </div>
)

export default CheckoutSummary;