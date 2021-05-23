import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Auth from './Auth/Auth'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Header from './Header/Header'
import CheckOut from './Orders/CheckOut/CheckOut'
import Orders from './Orders/Orders'
import {connect} from "react-redux"
import { authCheck } from '../Redux/AuthActionCreator'
import { Component } from 'react'
import { Logout } from './Auth/Logout'

const mapStateToProps = state => {
    return{
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        authCheck: () => dispatch(authCheck()),
    }
}
class Main extends Component {
    componentDidMount(){
        this.props.authCheck();
    }
    render () {
        let routes = null;
    if(this.props.token === null){
            routes = (
                <Switch>
                    <Route path="/login" exact component={Auth} />
                    <Redirect to="/login" />
                </Switch>
            )
    }
    else{
        routes = (
            <Switch>
                <Route path="/orders" exact component={Orders} />
                <Route path="/checkout" exact component={CheckOut} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
            </Switch>
        )
    }
    return (
        <div>
            
            <Header></Header>
            <div className="container">
            {routes}
            </div>
        </div>
    )
}

    }
    
export default connect(mapStateToProps, mapDispatchToProps)(Main)
