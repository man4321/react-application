import React, { Component } from 'react';
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom';
import ContentData from './ContentData/ContentData'

class Checkout extends Component {
    state = {
        ingredientes: null,
        price: 0
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        // console.log(query);
        const ingredientes = {};
        let totalPrice = 0;
        for (let params of query.entries()) {
            //[salad,1],
            if (params[0] === 'price') {
                totalPrice=params[1];
            }
            else {

                ingredientes[params[0]] = +params[1]
            }

        }
        this.setState({ ingredientes: ingredientes,price:totalPrice })
    }
    CheckoutCancelHandler = () => {
        this.props.history.goBack();
    }
    CheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/content-data')
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredientes}
                    price = {this.state.price}
                    checkoutCancel={this.CheckoutCancelHandler}
                    checkoutContinued={this.CheckoutContinuedHandler} />
                <Route path={this.props.match.path + "/content-data"} render={(props) => <ContentData ingredients={this.state.ingredientes} totalPrice={this.state.price} {...props} />}/>
            </div>
        )
    }
}

export default Checkout;