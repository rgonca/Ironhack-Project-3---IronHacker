import React from 'react' 

import { Link } from 'react-router-dom'


import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import './Post-card.css'

const Comments = props => {
    return (
        <>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Comments <FontAwesomeIcon icon={faEye} size="lg" />
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {
                            ['lg'].map(idx => (
                                <ListGroup>
                                    {props.comments.reverse().map(comments => (
                                        <ListGroup.Item key={comments}>
                                            <Card>
                                                <Card.Header> <Link to={`/user/${props.comments.owner}`}>
                                                    <Card.Title>
                                                        {props.comments.owner}
                                                    </Card.Title>
                                                </Link></Card.Header>
                                                <Card.Body>
                                                    <blockquote className="blockquote mb-0">
                                                        <p>
                                                            {props.comments.content}
                                                        </p>
                                                        <footer className="blockquote-footer">
                                                            {props.comments.createdAt}
                                                        </footer>
                                                    </blockquote>
                                                </Card.Body>
                                            </Card>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ))}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </>
    )
}
export default Comments