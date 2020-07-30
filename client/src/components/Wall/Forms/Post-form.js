import React, { Component } from 'react'
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
class postForm extends Component {
    constructor(props) {
        super(props)
        const { post } = this.props;
        console.log("constructor", post)
        this.state = {
            id: post ? post._id : '',
            content: post ? post.content : '',
            tags: post ? post.tags : [],
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.post && Object.keys(prevProps.post).length == 0 && Object.keys(this.props.post).length > 0) {
            const { _id, content, tags } = this.props.post
            this.setState({ id: _id, content, tags });
        }
    }
    AddItemsToArray = e => {

        const tags = this.state.tags
        let index
        
        e.target.checked ? tags.push(e.target.value.toString()) : index = tags.indexOf(e.target.value) && tags.splice(index, 1)

        this.setState({ tags: tags })
    }
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    render() {
        return (
            <>
                <Form onSubmit={(e) => this.props.handleFormSubmit(e, this.state)}>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.content} name="content" as="textarea" rows="3" placeholder="Tell us more..." />
                        <Form.Text className="text-muted">Every time you make a typo, the errorist win.</Form.Text>
                    </Form.Group>
                    <Form.Group>

                        <Form.Check onChange={this.AddItemsToArray} name="WebDev" type="checkbox" value="WebDev" label="WebDev" />
                        <Form.Check onChange={this.AddItemsToArray} name="UXUI" type="Checkbox" value="UXUI" label="UX/UI" />
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
export default postForm