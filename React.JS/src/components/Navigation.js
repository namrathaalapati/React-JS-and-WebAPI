import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export default class Navigation extends Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <NavLink className="d-inline p-2 bg-dark text-white" to='/'>Home</NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to='/Order'>Order</NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to='/Customer'>Customer</NavLink>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
