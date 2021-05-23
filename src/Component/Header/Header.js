import React from 'react'
import "./Header.css"
import {Navbar, NavbarBrand, NavItem, Nav} from "reactstrap"

import logo from "../../assets/burgerLogo.png"
import { NavLink } from 'react-router-dom'
import {connect} from "react-redux"

const mapStateToProps = state => {
    return {
        token: state.token
    }
}
const Header = (props) => {
    let links = null;
    if(props.token === null){
        links = (
            
                <Nav className="ml-md-5">
        <NavItem>
            <NavLink to="/login" className="NavLink">Login</NavLink>
        </NavItem>
        </Nav>
        
        )
    }
    else{
        links =(
            <Nav className="ml-md-5">
        <NavItem>
            <NavLink to="/" className="NavLink">BurgerBuilder</NavLink>
        </NavItem>

        <NavItem>
            <NavLink to="/orders" className="NavLink">Orders</NavLink>
        </NavItem>
        <NavItem>
            <NavLink to="/logout" className="NavLink">Logout</NavLink>
        </NavItem>
        </Nav>
        )
    }
    return (
        <div className="Navigation">
            <Navbar style={{backgroundColor: "#D70F64", height: "110px"}}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                    <img src={logo} style={{width:"80px"}} alt=""/>
                </NavbarBrand>
                
                {links}
            </Navbar>
        </div>
    )
}

export default connect(mapStateToProps)(Header)
