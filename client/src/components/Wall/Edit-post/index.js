
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
            tags:[],
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
    handleFormSubmit = e => {
        e.preventDefault()
        this.postsService
            .editPosts(this.state)
            .then(() => this.props.handleWall())
            .catch(err => console.log(err))
    }
    render() {
        console.log('traza edicion', this.state);
        return (
            <>
                <h1>EditPost</h1>
                <hr></hr>
                <PostForm {...this.state} handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange} addItemsToArray={this.addItemsToArray} />
                </>
        )
    }
    
}

export default EditPost