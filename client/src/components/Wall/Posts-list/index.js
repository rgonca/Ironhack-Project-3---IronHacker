import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'

import PostCard from './Post-card'
import PostForm from './../Post-form'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'



class PostsWall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            showModal: false
        }
        this.postsService = new PostsService()
    }

    componentDidMount = () => { this.updateWall() }
    
    updateWall = () => {
        this.postsService
            .getAllPosts()
            .then(response => this.setState({ posts: response.data }))
            .catch(err => console.log('muestrame el error', err))
    }
    handleModal = status => this.setState({ showModal: status })

    handleWall = () => {
        this.handleModal(false)
        this.updateWall()
    }
    deletePostButton = (id) => {
        this.postsService
            .deletePost(id)
            
            .then(response => {
                const deletion = this.state.posts.filter(post => post._id !== id)
                this.setState({ posts: deletion })
            })
            .catch(err => console.log('muestrame el error', err))

    }

    render() {
        console.log(this.props.loggedInUser);
        return (
            
            <>
                <Container as="main" className="wall">

                    <h1>The Wall</h1>
                    {
                        this.props.loggedInUser && <Button onClick={() => this.handleModal(true)} variant="dark" size="sm" style={{ marginBottom: '20px' }}>Crear nuevo item</Button>
                    }
                    <Row>
                        {this.state.posts.map(elm => <PostCard key={elm._id} {...elm} deleteButton={this.deletePostButton} loggedInUser={this.props.loggedInUser}/>)}
                    </Row>
                </Container>
                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        
                        <PostForm handleWall={this.handleWall} />

                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default PostsWall