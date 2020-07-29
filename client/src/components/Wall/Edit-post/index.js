import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'
import PostForm from '../Forms/Post-form'

class EditPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            content: this.props.content,
            createdAt: this.props.createdAt,
            tags: [],
            post: null,
            posts: this.props.posts
        }
        this.postsService = new PostsService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    addItemsToArray = e => {
        const tags = this.state.tags
        let index
        e.target.checked ? tags.push(e.target.value.toString()) : index = tags.indexOf(e.target.value) && tags.splice(index, 1)
        this.setState({ tags: tags })
    }

    handleFormSubmit = (e, post) => {
        e.preventDefault()
        this.postsService
            .editPosts(post.id, post)
            .then(() => {
                this.props.handleWall()
            })
            .catch(err => console.log(err))
    }

    render() {
        const post = this.props.id ? this.props.posts.filter(post => post._id == this.props.id)[0] : {}
        return (
            <>
                <h1>EditPost</h1>
                <hr></hr>
                <PostForm {...this.state} post={post} handleFormSubmit={this.handleFormSubmit} addItemsToArray={this.addItemsToArray} />
            </>
        )
    }
}
export default EditPost