import React, { Component } from 'react'
import AuthService from '../../../../service/AuthService'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EditionForm extends Component {
    constructor(props) {
        super(props)
        this.state = {

            ...this.props.editableUser,
            name: this.props.name,
            surname: this.props.surname,
            role: this.props.role,
            avatarUrl: this.props.avatarUrl,
            linkedinProfile: this.props.linkedinProfile,
            githubProfile: this.props.githubProfile,
            projectTitle: this.props.projectTitle,
            projectDescription: this.props.projectDescription,
            projectLink: this.props.projectDescription,
            warName: this.props.warName,
            funFact: this.props.funFact
        }
        this.authService = new AuthService()

    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.authService
            .editUser(this.state, this.props.id)
            .then((response) => this.props.setTheUser(response.data))
            .catch(err => console.log(err))
        this.props.closeModal()
    }
    printRoleForm = () => {
        if (this.state.role !== 'ADMIN') {
            return
        } return (
            <>
                <Form.Group>
                    <Form.Control as="select" onChange={this.handleInputChange} value={this.state.role} name="role">
                        <option>Select a Role</option>
                        <option value="STUDENT">STUDENT</option>
                        <option value="ALUMNI">ALUMNI</option>
                        <option value="ADMIN">ADMIN</option>
                    </Form.Control>
                </Form.Group>
            </>
        )
    }

    printProtectedFields = () => {
        if (this.state.role !== 'ALUMNI') {
            return
        }
        return (

            <>
                <Form.Group>
                    <Form.Label>Are you working on a project? Maybe a great job?... Tell us more</Form.Label>
                    <Form.Control onChange={this.handleInputChange} value={this.state.projectTitle} name="projectTitle" type="text" placeholder="Your project title" />
                </Form.Group>
                <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control onChange={this.handleInputChange} value={this.state.projectDescription} name="projectDescription" as="textarea" rows="3" placeholder="Tell us more..." />
                </Form.Group>
            </>
        )
    }

    render() {

        return (
            <>
                <h3>Edit Profile</h3>
                <hr></hr>
                <Form onSubmit={this.handleFormSubmit}>
                    {this.printRoleForm()}
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                        <Form.Text className="text-muted">Sin faltas de ortografía.</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Surname</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.surname} name="surname" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.avatarUrl} name="avatarUrl" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>LinkdIn</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.linkedinProfile} name="linkedinProfile" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>GitHub</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.githubProfile} name="githubProfile" type="text" />
                    </Form.Group>

                    {this.printProtectedFields()}
                    <Form.Group>
                        <Form.Label>Something funny about the Bootcamp?</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.warName} name="warName" type="text" placeholder="A nickname maybe?" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.funFact} name="funFact" as="textarea" rows="3" placeholder="Tell us more funfacts..." />
                    </Form.Group>

                    <Button variant="dark" type="submit">Submit</Button>
                </Form>



            </>
        )
    }
}

export default EditionForm