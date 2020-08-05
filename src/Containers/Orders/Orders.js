import React, { Component } from "react";
import Order from '../../Components/Order/Order'
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import Spnnier from '../../Components/UI/Spnnier/Spnnier'
class Orders extends Component{
    state={
        ingredients:null,
        totalPrice:0,
        loding:true,
        orders:null
    }
    componentDidMount(){
        axios.get('/order.json')
        .then(res=>{
            const ordersData=[];
            let ingredients={};
            let price=0;
            //  console.log(res.data)
             for(let key in res.data){
                //  console.log(res.data[key])
                 ingredients=res.data[key].ingredients;
                 price = res.data[key].price;
                 ordersData.push({ingredients,price,key})
             }
            //  console.log(ordersData)
             this.setState({loding:false,orders:ordersData})

        })
        .catch(error => error);
        
    }
    

    render(){
        let order;
        if(!this.state.loding){
        order=this.state.orders.map(order=>{
            console.log(order.ingredients)
            return (<Order  ingredients={order.ingredients} price={order.price}/>)
        });
        }
        if(this.state.loding) {
        order=<Spnnier/>
    }
        return (
            <div>
            {order}
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios);