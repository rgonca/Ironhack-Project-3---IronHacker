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
            .createPost(post)
            .then(() => this.props.handleWall())
            .catch(err => console.log(err))
    }
    render() {
        console.log('traza crear',this.state );
        return (
            <>
                <h1>New post</h1>
                <hr></hr>
                <PostForm {...this.state} handleFormSubmit={this.handleFormSubmit} addItemsToArray={this.addItemsToArray} />            </>
        )
    }
}

export default CreatePost