import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'


import PostCard from './Post-card'
import PostForm from './../Post-form'
import SearchBar from '../Autocomplete'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'



class PostsWall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            showModal: false,
            post:[]
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

    // filterPosts = (tags) => {
    //     this.postsService
    //         .filterPosts(tags)
    //         .then(response => this.updateWall(response))
    //         .catch(err => console.log('muestrame el error', err))
    // }


    commentPost = (id) => {
        console.log('traza entra', id);
        this.postsService
            .getOnePost(id)
            .then(response => this.setState({ post: response.data }))
            .catch(err => console.log('muestrame el error', err))
    }



    render() {
        console.log('traza titulo',this.state.post );
        return (

            <>
                <Container as="main" className="wall">

                    <h1>The Wall</h1>

                    <Form inline filterPosts={this.filterPosts}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>

                    {
                        this.props.loggedInUser && <FontAwesomeIcon onClick={() => this.handleModal(true)} icon={faPlusSquare} size="2x" />
                    }
                    <SearchBar />
                    <Row>
                        {this.state.posts.reverse().map(elm => <PostCard key={elm._id} {...elm} deleteButton={this.deletePostButton} commentPost={this.commentPost} loggedInUser={this.props.loggedInUser} />)}
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