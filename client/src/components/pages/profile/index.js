import React, { Component } from 'react'
import AuthService from '../../../service/AuthService'

import EditionForm from './Edition-form'

import { Link } from 'react-router-dom'
import ShareLink from 'react-linkedin-share-link'

import LinkdinLogo from './linkdinlogo.png'
import GitHubLogo from './githublogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import './profile.css'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            id: this.props.loggedInUser._id || "",
            name: this.props.loggedInUser.name || "",
            surname: this.props.loggedInUser.surname || "",
            role: this.props.loggedInUser.role || "",
            avatarUrl: this.props.loggedInUser.avatarUrl || "",
            linkedinProfile: this.props.loggedInUser.linkedinProfile || "",
            githubProfile: this.props.loggedInUser.githubProfile || "",
            projectTitle: this.props.loggedInUser.projectTitle || "",
            projectDescription: this.props.loggedInUser.projectDescription || "",
            projectLink: this.props.loggedInUser.projectLink || "",
            warName: this.props.loggedInUser.warName || "",
            funFact: this.props.loggedInUser.funFact || "",
        }
        this.authService = new AuthService
    }

    handleModal = () => this.setState({ showModal: true })
    onHide = () => this.setState({ showModal: false })

    handleUserEdition = () => {
        this.handleModal(false)
        this.updateProfile()
    }

    render() {
        return (
            <>
                <Container className="profile">
                    <Image src={this.props.loggedInUser.avatarUrl} alt="Profile Picture" rounded className='profilePicture' />
                    <h1>{this.props.loggedInUser.name} {this.props.loggedInUser.surname}</h1>
                    {
                        this.props.loggedInUser && <Button onClick={() => this.handleModal()} variant="dark" size="sm" style={{ marginBottom: '20px' }}><FontAwesomeIcon icon={faUserEdit} /></Button>
                    }
                    <hr></hr>

                    <h3>{this.props.loggedInUser.bootcamp}</h3>
                    <h4>{this.props.loggedInUser.bootcampCity}</h4>
                    <h5>{this.props.loggedInUser.bootcampMode}</h5>
                    <h5>{this.props.loggedInUser.bootcampDate}</h5>

                    <hr></hr>
                    <h3>{this.props.loggedInUser.role}</h3>
                    <hr></hr>

                    <h2>Your Links</h2>
                    
                    <div className="links">
                        <Link>
                            <Image className="logos" src={LinkdinLogo} />
                            <a target='_blank' href={this.props.loggedInUser.linkedinProfile}>{this.props.loggedInUser.linkedinProfile}</a>
                        </Link>
                        <hr></hr>
                        <Link>
                            <Image className="logos" src={GitHubLogo} />
                            <a target='_blank' href={this.props.loggedInUser.githubProfile}>{this.props.loggedInUser.githubProfile}</a>
                        </Link>
                    </div>
                    <hr></hr>

                    <h2>Interesting Info</h2>
                    <hr></hr>
                    <h3>{this.props.loggedInUser.projectTitle}</h3>
                    <p>{this.props.loggedInUser.projectDescription}</p>

                    <hr></hr>

                    <h2>Fun Facts</h2>
                    <hr></hr>
                    <div className="warName">
                        <h3>Nickname: </h3>
                        <h4>"{this.props.loggedInUser.warName}"</h4>
                    </div>
                    <p>{this.props.loggedInUser.funFact}</p>

                </Container>

                <Modal size="lg"
                    show={this.state.showModal}
                    onHide={this.onHide}
                >
                    <Modal.Body>

                        {this.state.showModal ? <EditionForm
                            loggedInUser={this.props.loggedInUser}
                            editableUser={this.props.loggedInUser}
                            {...this.state}
                            setTheUser={this.props.setTheUser}
                            closeModal={this.onHide}
                        /> : null}
                    </Modal.Body>
                </Modal>

            </>
        )

    }
}

export default Profile