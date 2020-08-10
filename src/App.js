import React from 'react';
import classes from './App.module.css';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBUilder'
import Checkout from './Containers/Checkout/Checkout'
import Orders from './Containers/Orders/Orders'
import { Route,Switch } from 'react-router-dom'

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
        </Switch>
      </Layout>
       
    </div>
  );
}

export default App;
