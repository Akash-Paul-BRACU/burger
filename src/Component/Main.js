import React from 'react'
import { Route } from 'react-router-dom'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Header from './Header/Header'
import CheckOut from './Orders/CheckOut/CheckOut'
import Orders from './Orders/Orders'

const Main = () => {
    return (
        <div>
            
            <Header></Header>
            <div className="container">
            <Route path="/orders" exact component={Orders} />
            <Route path="/checkout" exact component={CheckOut} />
            <Route path="/" exact component={BurgerBuilder} />
            </div>
        </div>
    )
}

export default Main
