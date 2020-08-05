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




const INGREDIENT_PRICES = {
    meat: 10,
    salad: 5,
    bacon: 20,
    cheese: 10
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 30,
        purchasable: false,
        purchasing: false,
        loader: false,
        error: false
    }
    componentDidMount() {
        axios.get('https://burger-builder-eaad3.firebaseio.com/ingrediant.json')
            .then(res => {
                this.setState({ ingredients: res.data });
            })
            .catch(error => this.setState({ error: true }))
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });

    }
    // ModalHandler = () => (
    //     <div>Manohar seervi</div>
    // )
    // BurgerHandler = () => (
    //     <Burger />
    // )


    purchaseContinueHandler = () => {
   
    const queryParams = [];
    for(let i in this.state.ingredients){
        queryParams.push(encodeURIComponent(i)+ "="+ encodeURIComponent(this.state.ingredients[i]))
    } 
    queryParams.push('price='+this.state.totalPrice)
    const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:"/checkout",
            search:"?"+ queryString
        })
        
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        let orderSummary = null;


        let burger = this.state.error ? <p style={{ textAlign: 'center' }}>ingrediants not working!!</p> : <Spnnier />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);