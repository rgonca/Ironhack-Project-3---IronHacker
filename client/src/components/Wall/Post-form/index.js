import React, { Component } from 'react'
import PostsService from '../../../service/PostsService'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class PostForm extends Component {
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
    AddItemsToArray = e => {

        const tags = this.state.tags
        let index
        
        e.target.checked ? tags.push(e.target.value.toString()) : index = tags.indexOf(e.target.value) && tags.splice(index, 1)

        this.setState({ tags: tags })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.postsService
            .createPost(this.state)
            .then(() => this.props.handleWall())
            .catch(err => console.log(err))
    }
    render() {
        console.log('traza', this.state)
        return (
            <>
                <h1>New post</h1>
                <hr></hr>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.content} name="content" as="textarea" rows="3" placeholder="Tell us more..." />
                        <Form.Text className="text-muted">Every time you make a typo, the errorist win.</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        
                        <Form.Check onChange={this.AddItemsToArray} name="WebDev" type="checkbox" value="WebDev" label="WebDev" />
                        <Form.Check onChange={this.AddItemsToArray} name="UX/UI" type="Checkbox" value="UX/UI" label="UX/UI" />
                        <Form.Check onChange={this.AddItemsToArray} name="Data" type="checkbox" value="Data" label="Data" />
                        <Form.Check onChange={this.AddItemsToArray} name="Jobs" type="checkbox" value="Jobs" label="Jobs" />
                        <Form.Check onChange={this.AddItemsToArray} name="Projects" type="checkbox" value="Projects" label="Projects" />
                        <Form.Check onChange={this.AddItemsToArray} name="Offers" type="checkbox" value="Offers" label="Offers" />
                        <Form.Check onChange={this.AddItemsToArray} name="Requests" type="checkbox" value="Requests" label="Requests" />
                        <Form.Check onChange={this.AddItemsToArray} name="Misc" type="Checkbox" value="Misc" label="Misc" />
                    </Form.Group>
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </>
        )
    }
}

export default PostForm