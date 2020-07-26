import React, { Component } from 'react'

import AuthService from '../../../service/AuthService'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './signup.css'


class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: '',
            name: '',
            surname: '',
            bootcamp: '',
            bootcampCity: '',
            bootcampMode: '',
            bootcampDate: '',


        }
        this.authService = new AuthService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    handleBootcampChange = e => {
        this.setState({ bootcamp: e.target.value })
    }
    handleBootcampCityChange = e => {
        this.setState({ bootcampCity: e.target.value })
    }
    handleBootcampModeChange = e => {
        this.setState({ bootcampMode: e.target.value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.authService
            .signup(this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.handleToast(true, 'Signup Complete')
                this.props.history.push('/profile')
            })
            .catch(err => console.log(err.response.data.message))   // Error handling yay!
    }

    render() {
        return (
            <Container as="main">

                <Row>
                    <Col md={{ offset: 3, span: 6 }} className="signup">
                        <h3>User Signup</h3>

                        <hr></hr>

                        <Form onSubmit={this.handleFormSubmit}>

                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                                <Form.Text className="text-muted">Should have least three characters</Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.email} name="email" type="email" placeholder="name@example.com" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Surname</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.surname} name="surname" type="text" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Your Bootcamp</Form.Label>
                                <Form.Check onChange={this.handleBootcampChange} name="Web Development" type="radio" value="Web Development" label="Web Development" />
                                <Form.Check onChange={this.handleBootcampChange} name="UX/UI Desing" type="radio" value="UX/UI Desing" label="UX/UI Desing" />
                                <Form.Check onChange={this.handleBootcampChange} name="Data Analytics" type="radio" value="Data Analytics" label="Data Analytics" />
                            </Form.Group>

                            <Form.Group >

                                <Form.Control as="select" onChange={this.handleBootcampCityChange} value={this.state.bootcampCity}>
                                    <option>Select a City</option>
                                    <option value="Madrid">Madrid</option>
                                    <option value="Barcelona">Barcelona</option>
                                    <option value="Miami">Miami</option>
                                    <option value="Paris">Paris</option>
                                    <option value="Mexico City">Mexico City</option>
                                    <option value="Berlin">Berlin</option>
                                    <option value="Amsterdam">Amsterdam</option>
                                    <option value="Sao Paulo">Sao Paulo</option>
                                    <option value="Lisbon">Lisbon</option>
                                    <option value="Remote">Remote</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control onChange={this.handleInputChange} value={this.state.bootcampDate} name="bootcampDate" type="date" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Check onChange={this.handleBootcampModeChange} name="Full Time" type="radio" value="Full Time" label="Full Time" />
                                <Form.Check onChange={this.handleBootcampModeChange} name="Part Time" type="radio" value="Part Time" label="Part Time" />
                            </Form.Group>

                            <Button variant="outline-secondary" size="lg" type="submit">Signup</Button>
                        </Form>

                    </Col>
                </Row>


            </Container>
        )
    }
}

export default SignupForm
