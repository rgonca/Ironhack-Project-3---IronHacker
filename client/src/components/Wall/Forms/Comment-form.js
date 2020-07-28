import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CommentForm = props => {
    return (
        <>
            <Form onSubmit={props.handleFormSubmit}>
                <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control onChange={props.handleInputChange} value={props.content} name="content" as="textarea" rows="2" placeholder="Make a comment..." />
                </Form.Group>
                <Button variant="outline-info" type="submit">Submit</Button>
            </Form>
            </>
    )
}

export default CommentForm