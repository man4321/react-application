import React, { Component } from 'react';
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom';
import ContentData from './ContentData/ContentData';
import { connect } from 'react-redux';


class Checkout extends Component {
   
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search)
    //     // console.log(query);
    //     const ingredientes = {};
    //     let totalPrice = 0;
    //     for (let params of query.entries()) {
    //         //[salad,1],
    //         if (params[0] === 'price') {
    //             totalPrice=params[1];
    //         }
    //         else {

    //             ingredientes[params[0]] = +params[1]
    //         }

    //     }
    //     this.setState({ ingredientes: ingredientes,price:totalPrice })
    // }
    CheckoutCancelHandler = () => {
        this.props.history.goBack();
    }
    CheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/content-data')
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ing}
                    price = {this.props.price}
                    checkoutCancel={this.CheckoutCancelHandler}
                    checkoutContinued={this.CheckoutContinuedHandler} />
                <Route path={this.props.match.path + "/content-data"} render={(props) => <ContentData ingredients={this.props.ing} totalPrice={this.props.price} {...props} />}/>
            </div>
        )
    }
}

const mapStateToprops =state=>{
    return {
        ing:state.ingredients,
        price:state.totalPrice
    }
}

export default connect(mapStateToprops)(Checkout);