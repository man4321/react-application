import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../Components/Burger/Burger'
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummry/OrderSummary';

import BuildControls from '../../Components/BuildControls/BuildControls';
import Spnnier from '../../Components/UI/Spnnier/Spnnier'
import axios from '../../axios-order';

import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler'
import { Route } from 'react-router-dom'

import { connect } from 'react-redux';
import * as actionType from '../../store/action'



class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loader: false,
       
    }
     
    componentDidMount(){
        console.log("ingredients lodding");
        this.props.setIngredietns();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });

    }
    

    purchaseContinueHandler = () => {

        this.props.history.push({
            pathname: "/checkout",
           
        })

    }

    render() {
        const disabledInfo = {
            ...this.props.ing
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        let orderSummary = null;


        let burger = this.props.error ? <p style={{ textAlign: 'center' }}>ingrediants not working!!</p> : <Spnnier />;
        if (this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ing)}
                        ordered={this.purchaseHandler}
                        price={this.props.price ? this.props.price:40} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ing}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />

        }
        if (this.state.loader) {
            orderSummary = <Spnnier />
        }



        return (

            <Aux>
                {/* <Route path="/OrderSummary" render={()=><Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} orderSummary={orderSummary}>{orderSummary}</Modal>}/> */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        );
    }
}

const mapStoreToprops = state => {
    return {
        ing: state.ingredients,
        price: state.totalPrice,
        error:state.error
    }
};
const mapDispatchToProps = dispatch =>  {
    return {
    addIngredient: (ingName) => dispatch(actionType.addIngredient(ingName)),
    removeIngredient: (ingName) => dispatch(actionType.removeIngredient(ingName)),
    setIngredietns:()=>dispatch(actionType.fetchIngredients())
    
    }

}



export default connect(mapStoreToprops, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));