import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'


import PostCard from '../Post-Card'
import CreatePost from '../Create-post'
import EditPost from '../Edit-post'
// import SearchBar from '../Searchbar'



import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'


class PostsWall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            showModal: false,
            showEditionModal: false,
            // tags: [],
            post: {},

        }
        this.postsService = new PostsService()
    }

    componentDidMount = () => { this.updateWall() }
    //bring all the posts
    updateWall = () => {
        this.postsService
            .getAllPosts()
            .then(response => this.setState({ posts: response.data }))
            .catch(err => console.log('muestrame el error', err))
    }
    //handle creation modal
    handleModal = status => this.setState({ showModal: status })

    handleWall = () => {
        this.handleModal(false)
        this.updateWall()
    }
    //delete posts
    deletePostButton = (id) => {
        this.postsService
            .deletePost(id)

            .then(response => {
                const deletion = this.state.posts.filter(post => post._id !== id)
                this.setState({ posts: deletion })
            })
            .catch(err => console.log('muestrame el error', err))

    }
    //handle edition modal
    handleEditionModal = status => this.setState({ showEditionModal: status })

    handleEdition = () => {
        this.handleEditionModal(false)
        this.updateWall()
    }
    //filter the posts by tags

    filterPosts = tags => {
        console.log('traza el tag', tags);
        this.postsService

            .filterPosts(tags)
            .then(response => this.setState({ posts: response.data }))
            .catch(err => console.log('muestrame el error', err))
    }
    //edit posts
    editPostButton = (_id) => {
        this.postsService
            .getOnePost(_id)
            .then(response => this.setState({ post: response.data }))
            .catch(err => console.log('muestrame el error', err))
    }
    //delete comments on posts
    deleteCommentButton = (id) => {
        this.postsService
            .deleteComment(id)
            .then(response => this.updateWall(response))
            .catch(err => console.log('muestrame el error', err))

    }



    render() {
        console.log('traza posts', this.state.posts);
        return (

            <>
                <Container as="main" className="wall">

                    <h1 className="directory">The Wall</h1>

                    {/* <SearchBar filterPosts={this.filterPosts} updateWall={this.updateWall}/> */}

                    {
                        this.props.loggedInUser && <FontAwesomeIcon onClick={() => this.handleModal(true)} icon={faPlusSquare} size="2x" />
                    }
                    <Row className='posts'>
                        {this.state.posts.reverse().map(elm => <PostCard key={elm._id} {...elm}

                            editPostButton={this.editPostButton}
                            handleEditionModal={this.handleEditionModal}
                            deleteButton={this.deletePostButton}
                            deleteCommentButton={this.deleteCommentButton}
                            updateWall={this.updateWall}
                            loggedInUser={this.props.loggedInUser} />)}
                    </Row>
                </Container>
                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>

                        <CreatePost handleWall={this.handleWall} />

                    </Modal.Body>
                </Modal>
                <Modal size="lg" show={this.state.showEditionModal} onHide={() => this.handleEditionModal(false)}>
                    <Modal.Body>

                        <EditPost handleWall={this.handleEdition} id={this.state.post._id} posts={this.state.posts} />
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}

export default PostsWall