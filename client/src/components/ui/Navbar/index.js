
import React, { Component } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeEurope, faUsers, faDoorClosed } from '@fortawesome/free-solid-svg-icons'

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
            <Navbar bg="light" variant="light" expand="lg" sticky="top" >
                {this.props.loggedInUser ?
                    <Navbar.Brand>
                        <Link to="/wall"><Image className="logo" src="../../../../ironhackLogo.png" alt="IronhackLogo" /></Link>
                    </Navbar.Brand> :
                    <Navbar.Brand>
                        <Link to="/"><Image className="logo" src="../../../../ironhackLogo.png" alt="IronhackLogo" /></Link>
                    </Navbar.Brand>}

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">

                        {this.props.loggedInUser ?
                            (
                                <>
                                    <Nav.Link as="span">

                                        <NavLink to="/wall" activeStyle={{ color: 'white' }}><FontAwesomeIcon icon={faGlobeEurope} size="lg"/></NavLink>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <NavLink to="/directory" activeStyle={{ color: 'white' }}><FontAwesomeIcon icon={faUsers} size="lg"/></NavLink>
                                    </Nav.Link>

                                    <Nav.Link as="span">
                                        <span onClick={this.logout}><FontAwesomeIcon icon={faDoorClosed} size="lg"/></span>
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as="span">
                                        <NavLink to="/signup" activeStyle={{ color: 'white' }}><Button variant="outline-secondary">Signup</Button></NavLink>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <NavLink to="/login" activeStyle={{ color: 'white' }}> <Button variant="outline-primary">Login</Button></NavLink>
                                    </Nav.Link>
                                </>
                            )
                        }

                        <Nav.Link as="span">
                            <NavLink to="/profile" activeStyle={{ color: 'white' }}><Image className="logo" src={this.props.loggedInUser ? this.props.loggedInUser.avatarUrl : ''} /></NavLink>
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation