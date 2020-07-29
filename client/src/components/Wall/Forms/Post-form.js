import React from 'react'

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const postForm = props => {
    return (
        <>
            <Form onSubmit={props.handleFormSubmit}>
                <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control onChange={props.handleInputChange} value={props.content} name="content" as="textarea" rows="3" placeholder="Tell us more..." />
                    <Form.Text className="text-muted">Every time you make a typo, the errorist win.</Form.Text>
                </Form.Group>
                <Form.Group>

                    <Form.Check onChange={props.addItemsToArray} name="WebDev" type="checkbox" value="WebDev" label="WebDev" />
                    <Form.Check onChange={props.addItemsToArray} name="UXUI" type="Checkbox" value="UXUI" label="UX/UI" />
                    <Form.Check onChange={props.addItemsToArray} name="Data" type="checkbox" value="Data" label="Data" />
                    <Form.Check onChange={props.addItemsToArray} name="Jobs" type="checkbox" value="Jobs" label="Jobs" />
                    <Form.Check onChange={props.addItemsToArray} name="Projects" type="checkbox" value="Projects" label="Projects" />
                    <Form.Check onChange={props.addItemsToArray} name="Offers" type="checkbox" value="Offers" label="Offers" />
                    <Form.Check onChange={props.addItemsToArray} name="Requests" type="checkbox" value="Requests" label="Requests" />
                    <Form.Check onChange={props.addItemsToArray} name="Misc" type="Checkbox" value="Misc" label="Misc" />
                </Form.Group>
                <Button variant="dark" type="submit">Submit</Button>
            </Form>
            </>
)
}
export default postForm