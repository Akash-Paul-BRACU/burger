import React from 'react'
import "./Header.css"
import {Navbar, NavbarBrand, NavItem, Nav} from "reactstrap"

import logo from "../../assets/burgerLogo.png"
import { NavLink } from 'react-router-dom'
const Header = () => {
    return (
        <div className="Navigation">
            <Navbar style={{backgroundColor: "#D70F64", height: "70px"}}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                    <img src={logo} style={{width:"80px"}} alt=""/>
                </NavbarBrand>
                <Nav className="ml-md-5">
                <NavItem>
                    <NavLink to="/" className="NavLink">BurgerBuilder</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink to="/orders" className="NavLink">Orders</NavLink>
                </NavItem>

                </Nav>
            </Navbar>
        </div>
    )
}

export default Header
