
import React from 'react'


import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
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
                        <Button variant="outline-primary" size="lg" href="/login">Login</Button>{' '}
                        <Button variant="outline-secondary" size="lg" href="/signup">Signup</Button>{' '}
                    </div>


                </Col>
            </Row>


        </Container>
    )
}

export default Index
