import React, { Component } from 'react'
import AuthService from '../../../service/AuthService'

import EditionForm from './Edition-form'

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
            user: this.props.loggedInUser,
            showModal: false
        }
        this.authService = new AuthService
    }

    componentDidMount = () => this.updateProfile()
    // componentDidMount = () => {

    //     const id = this.props.match.params.coaster_id

    //     this.coasterService
    //         .getOneCoaster(id)
    //         .then(response => this.setState({ coasterDetails: response.data }))
    //         .catch(err => console.log(err))
    // }

    updateProfile = () => {
        this.authService
            .getUser()
            .then(response => this.setState({ users: response.data }))
            .catch(err => console.log(err))
    }

    handleModal = status => this.setState({ showModal: status })

    handleUserEdition = () => {
        this.handleModal(false)
        this.updateProfile()
    }

    render() {

        console.log('traza', this.props.loggedInUser);
        const id = this.props.loggedInUser ? this.props.loggedInUser._id : ""
        const name = this.props.loggedInUser ? this.props.loggedInUser.name : ""
        const surname = this.props.loggedInUser ? this.props.loggedInUser.surname : ""
        const avatarUrl = this.props.loggedInUser ? this.props.loggedInUser.avatarUrl : ""
        const linkedinProfile = this.props.loggedInUser ? this.props.loggedInUser.linkedinProfile : ""
        const githubProfile = this.props.loggedInUser ? this.props.loggedInUser.githubProfile : ""
        const projectTitle = this.props.loggedInUser ? this.props.loggedInUser.projectTitle : ""
        const projectDescription = this.props.loggedInUser ? this.props.loggedInUser.projectDescription : ""
        const projectLink = this.props.loggedInUser ? this.props.loggedInUser.projectLink : ""
        const warName = this.props.loggedInUser ? this.props.loggedInUser.warName : ""
        const funFact = this.props.loggedInUser ? this.props.loggedInUser.funFact : ""

        return (
            <>
                <Container>
                    <Image src={this.props.loggedInUser.avatarUrl} alt="Profile Picture" rounded />
                    <Row>
                        <h1>{this.props.loggedInUser.name} {this.props.loggedInUser.surname}</h1>
                    </Row>
                    <Row>
                        {
                            this.props.loggedInUser && <Button onClick={() => this.handleModal(true)} variant="dark" size="sm" style={{ marginBottom: '20px' }}>Crear nuevo item</Button>
                        }

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

                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <EditionForm
                            id={id}
                            name={name}
                            surname={surname} 
                            avatarUrl={avatarUrl}
                            linkedinProfile={linkedinProfile}
                            githubProfile={githubProfile}
                            projectTitle={projectTitle}
                            projectDescription={projectDescription}
                            projectLink={projectLink}
                            warName={warName}
                            funFact={funFact}
                            handleUserEdition={this.handleUserEdition} />
                    </Modal.Body>
                </Modal>

            </>
        )
        // props.loggedInUser && <h1>¡Hola, {props.loggedInUser.name}!</h1>

    }
}

export default Profile