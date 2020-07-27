import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CommentForm extends Component {
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
            .commentToPost( this.state)
            .then(response => this.setState(response.data ))
            .catch(err => console.log(err))
    }
    render() {
        console.log('traza', this.props._id)
        return (
            <>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.content} name="content" as="textarea" rows="3" placeholder="Make a comment..." />
                        <Form.Text className="text-muted">Every time you make a typo, the errorist win.</Form.Text>
                    </Form.Group>
                    <Button variant="outline-info" type="submit">Submit</Button>
                </Form>
            </>
        )
    }

}
export default CommentForm