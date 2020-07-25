import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'

import UserCard from './User-card'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class UsersDirectory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
        this.postsService = new PostsService()
    }

    componentDidMount = () => { this.updateDirectory() }

    updateDirectory = () => {
        this.postsService
            .getAllUsers()
            .then(response => this.setState({ users: response.data }))
            .catch(err => console.log('muestrame el error', err))
    }
    render() {
        return (
            <>
                <h1>Aqui ira la lista de usuarios</h1>
                <Row>
                    {this.state.users.map(elm => <UserCard key={elm._id} {...elm}  loggedInUser={this.props.loggedInUser} />)}
                </Row>
            </>
        )
    }

}
export default UsersDirectory