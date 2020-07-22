
import React from 'react'
import './index.css'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const Index = () => {

    return (
        <Container as="main">

            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    
                    <Image src="./../../../../ironhackLogo.png" alt="IronHack Logo" id="logo" />
                    <h1>IronHacker</h1>
                    <h3>Welcome</h3>

                    <hr></hr>

                        <Button variant="outline-primary" href="/login">Login</Button>{' '}
                        <Button variant="outline-secondary" href="/signup">Signup</Button>{' '}

                  

                </Col>
            </Row>


        </Container>
    )
}

export default Index
