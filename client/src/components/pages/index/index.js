
import React from 'react'


import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import './index.css'

const Index = () => {

    return (
        <Container as="main">

            <Row>
                <Col md={{ offset: 3, span: 6 }} className="principal" >
                    <div className="ironhacker">
                        <h1 className="title">IronHacker</h1>
                        <h3 className="slogan">For us by us</h3>
                        <Image src="./../../../../ironhackLogo.png" alt="IronHack Logo" id="logo" />
                    </div>
                    <hr></hr>
                    <div className="buttons">
                        <Link to="/login" activeStyle={{ color: 'white' }}> <Button variant="outline-primary" size="lg">Login</Button>  {' '}</Link>

                        <Link to="/signup" activeStyle={{ color: 'white' }}><Button variant="outline-secondary" size="lg">Signup</Button> {' '}</Link>


                    </div>


                </Col>
            </Row>


        </Container>
    )
}

export default Index
