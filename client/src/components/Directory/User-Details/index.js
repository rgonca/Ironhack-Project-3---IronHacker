import React, { Component } from 'react'
import AuthService from '../../../service/AuthService'

import PostsService from '../../../service/PostsService'

import { Link } from 'react-router-dom'
import ShareLink from 'react-linkedin-share-link'

import LinkdinLogo from './../../pages/profile/linkdinlogo.png'
import GitHubLogo from './../../pages/profile/githublogo.png'
import EditionForm from '../../pages/profile/Edition-form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import './../../pages/profile/profile.css'

class UserDetails extends Component {
    constructor() {
        super()
        this.state = {
            userDetails: undefined,
            showModal: false,
            // id: this.props.match.params.user_id

        }
        this.postsService = new PostsService()
        this.authService = new AuthService()
    }
    componentDidMount = () => {

        const id = this.props.match.params.user_id

        this.postsService
            .getOneUser(id)
            .then(response => this.setState({ userDetails: response.data }))
            .catch(err => console.log(err))
    }

    handleModal = () => this.setState({ showModal: true })
    onHide = () => this.setState({ showModal: false })

    handleUserEdition = () => {
        this.handleModal(false)
        this.updateProfile()
    }

    render() {
        return (
            !this.state.userDetails ? <><Spinner animation="border" size="sm" /><Spinner animation="border" /> </>:
                <>
                    <Container className="profile">

                        <Image src={this.state.userDetails.avatarUrl} alt="Profile Picture" rounded className='profilePicture'/>
                        <h1>{this.state.userDetails.name} {this.state.userDetails.surname}</h1>
                        {
                            this.props.loggedInUser.role === 'ADMIN' && <Button onClick={() => this.handleModal()}  variant="dark" size="sm" style={{ marginBottom: '20px' }}><FontAwesomeIcon icon={faUserEdit} /></Button>
                        }
                        <hr></hr>

                        <h3>{this.state.userDetails.bootcamp}</h3>
                        <h4>{this.state.userDetails.bootcampCity}</h4>
                        <h5>{this.state.userDetails.bootcampMode}</h5>
                        <h5>{this.state.userDetails.bootcampDate}</h5>

                        <hr></hr>
                        <h3>{this.state.userDetails.role}</h3>
                        <hr></hr>

                        <h2>Your Links</h2>


                        <div className="links">
                            <Link>
                                <Image className="logos" src={LinkdinLogo} />
                                <a target='_blank' href={this.state.userDetails.linkedinProfile}>{this.state.userDetails.linkedinProfile}</a>
                            </Link>
                            <Link>
                                <Image className="logos" src={GitHubLogo} />
                                <a target='_blank' href={this.state.userDetails.githubProfile}>{this.state.userDetails.githubProfile}</a>
                            </Link>
                        </div>
                        <hr></hr>

                        <h2>Interesting Info</h2>
                        <hr></hr>
                        <h3>{this.state.userDetails.projectTitle}</h3>
                        <p>{this.state.userDetails.projectDescription}</p>

                        <hr></hr>

                        <h2>Fun Facts</h2>
                        <hr></hr>
                        <div className="warName">
                        <h3>Nickname: </h3>
                         <h4>"{this.state.userDetails.warName}"</h4>
                        </div>
                        <p>{this.state.userDetails.funFact}</p>

                    </Container>

                    <Modal size="lg"
                        show={this.state.showModal}
                        onHide={this.onHide}
                    >
                        <Modal.Body>

                            {this.state.showModal ? <EditionForm
                                loggedInUser={this.props.loggedInUser}
                                {...this.state.userDetails}
                                setTheUser={this.props.setTheUser}
                                closeModal={this.onHide}
                                id={this.props.match.params.user_id}
                            /> : null}
                        </Modal.Body>
                    </Modal>
                </>

        )
    }
}

export default UserDetails