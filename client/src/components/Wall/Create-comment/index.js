import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'

import CommentForm from '../Forms/Comment-form'



class CreateComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owner: this.owner,
            content: '',
            createdAt: this.createdAt
        }
        this.postsService = new PostsService()
    }
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.postsService
            .commentToPost(this.props.id, this.state)
            .then(() => this.props.updateWall())
            // .then(response => this.setState(response.data))
            .then(this.setState({content: ''}))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <>
                <CommentForm {...this.state} handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange}/>

            </>
        )
    }

}
export default CreateComment