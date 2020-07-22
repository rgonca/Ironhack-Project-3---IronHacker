
import React, { Component } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'

import AuthService from './../../../service/AuthService'

import { Link, NavLink } from 'react-router-dom'
import './navbar.css'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.AuthService = new AuthService()
    }

    logout = () => {
        this.AuthService
            .logout()
            .then(() => {
                this.props.setTheUser(false)
                this.props.handleToast(true, 'Usuario desconectado')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" >
                <Navbar.Brand>
                    <Link to="/"><Image className="logo" src="../../../../ironhackLogo.png" alt="IronhackLogo"/></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as="span">
                            <NavLink to="/" exact activeStyle={{ color: 'white' }}>Home</NavLink>
                        </Nav.Link>
                        <Nav.Link as="span">
                            <NavLink to="/coasters" activeStyle={{ color: 'white' }}>Montañas</NavLink>
                        </Nav.Link>

                        {this.props.loggedInUser ?
                            (
                                <Nav.Link as="span">
                                    <span onClick={this.logout}>Cerrar sesión</span>
                                </Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link as="span">
                                        <NavLink to="/signup" activeStyle={{ color: 'white' }}>Signup</NavLink>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <NavLink to="/login" activeStyle={{ color: 'white' }}>Login</NavLink>
                                    </Nav.Link>
                                </>
                            )
                        }

                        <Nav.Link as="span">
                            <NavLink to="/profile" activeStyle={{ color: 'white' }}>Hi, {this.props.loggedInUser ? this.props.loggedInUser.name : 'Guest'}</NavLink>
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation