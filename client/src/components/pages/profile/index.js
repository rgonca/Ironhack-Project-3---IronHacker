import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import './profile.css'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        console.log('traza', this.props.loggedInUser);
        return (
            <>
                <Container>
                    <Image src={this.props.loggedInUser.avatarUrl} alt="Profile Picture" rounded />
                    <Row>
                        <h1>{this.props.loggedInUser.name} {this.props.loggedInUser.surname}</h1>
                    </Row>
                    <Row>
                        <Button>Edit Profile</Button>
                    </Row>
                    <hr></hr>
                    <Row>
                        <h3>{this.props.loggedInUser.bootcamp}</h3>
                    </Row>
                    <Row>
                        <h4>{this.props.loggedInUser.bootcampCity}</h4>
                    </Row>
                    <Row>
                        <h5>{this.props.loggedInUser.bootcampMode}</h5>
                    </Row>
                    <Row>
                        <h5>{this.props.loggedInUser.bootcampDate}</h5>
                    </Row>
                    <hr></hr>
                    <Row>
                        <h3>{this.props.loggedInUser.role}</h3>
                    </Row>

                    <hr></hr>

                    <h2>Your Links</h2>

                    <Row>

                        <Link>
                            <Image className="logos" src="./../../../../linkdinlogo.png" />
                            {this.props.loggedInUser.linkedinProfile}
                        </Link>
                    </Row>
                    <Row>
                        <Link>
                            <Image className="logos" src="./../../../../githublogo.png" />
                            {this.props.loggedInUser.githubProfile}
                        </Link>
                    </Row>
                    <hr></hr>

                    <h2>Interesting Info</h2>

                    <Row>
                        <h3>{this.props.loggedInUser.projectTitle}</h3>
                        <p>{this.props.loggedInUser.projectDescription}</p>
                    </Row>

                    <hr></hr>

                    <h2>Fun Facts</h2>

                    <Row>
                        <h3>Nickname: </h3>
                        <h4>{this.props.loggedInUser.warName}</h4>
                    </Row>
                    
                    <Row>
                        <p>{this.props.loggedInUser.funFact}</p>
                    </Row>
                </Container>
            </>
        )
        // props.loggedInUser && <h1>¡Hola, {props.loggedInUser.name}!</h1>

    }
}

export default Profile