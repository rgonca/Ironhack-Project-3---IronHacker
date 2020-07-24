import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'

import PostCard from './Post-card'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'



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
        console.log('traza', 'actualiza', this.postsService);
        this.postsService
            .getAllPosts()
            .then(response => this.setState({ posts: response.data }))
            .catch(err => console.log('muestrame el error', err))
    }
    // handleModal = status => this.setState({ showModal: status })

    // handleWall = () => {
    //     this.handleModal(false)
    //     this.updateWall()
    // }

    render() {
        console.log('traza POST', this.state.posts)
        return (
            
            <>
                <Container as="main" className="wall">

                    <h1>The Wall</h1>
                    <Row>
                        {this.state.posts.map(elm => <PostCard key={elm._id} {...elm} />)}
                    </Row>
                </Container>
            </>
        )
    }
}

export default PostsWall