import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'

import PostForm from '../Forms/Post-form'
class CreatePost extends Component {
    constructor() {
        super()
        this.state = {
            owner: this.owner,
            content: '',
            tags: [],
            createdAt: this.createdAt,
            coments: ['']
        }
        this.postsService = new PostsService()
    }

    handleFormSubmit = (e, post) => {
        e.preventDefault()
        this.postsService
            .createPost(post)
            .then(() => this.props.handleWall())
            .catch(err => console.log(err))
    }
    render() {
        return (
            <>
                <h1>New post</h1>
                <hr></hr>
                <PostForm {...this.state} handleFormSubmit={this.handleFormSubmit}  />
            </>
        )
    }
}
export default CreatePost