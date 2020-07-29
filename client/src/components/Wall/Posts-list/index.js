import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'


import PostCard from '../Post-Card'
import CreatePost from '../Create-post'
import EditPost from '../Edit-post'
import SearchBar from '../Searchbar'



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
            showEditionModal: false,
            isFiltered: false,
            tags: [],
            post: {},
            isPostViewOn: false,
            sortValue: '',
            inputValue: ''
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
    changeFilterState = state => this.setState({ isFiltered: state })

    filterPosts = tag => {
        console.log('traza tag', tag);
        this.postsService

            .filterPosts(tag)
            
            .then(() => {
                const tags = this.state.tags.map()
            })
            .then(response => {
                const filteredPosts = this.state.posts.filter(posts => posts.tags === tag )
                this.setState({ posts: filteredPosts })
            })
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
            .then(response => {
                const deletion = this.state.posts.comments.filter(comment => comment._id !== id)
                this.setState({ posts: deletion })
            })
            .catch(err => console.log('muestrame el error', err))

    }



    render() {
        console.log('traza posts', this.state.posts);
        console.log('traza esta filtrando', this.state.isFiltered);
        return (

            <>
                <Container as="main" className="wall">

                    <h1>The Wall</h1>

                    <SearchBar filterPosts={this.filterPosts} changeFilterState={this.changeFilterState} />

                    {
                        this.props.loggedInUser && <FontAwesomeIcon onClick={() => this.handleModal(true)} icon={faPlusSquare} size="2x" />
                    }
                    <Row>
                        {this.state.posts.reverse().map(elm => <PostCard key={elm._id} {...elm}

                            editPostButton={this.editPostButton}
                            handleEditionModal={this.handleEditionModal}
                            deleteButton={this.deletePostButton}
                            commentPost={this.commentPost}
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