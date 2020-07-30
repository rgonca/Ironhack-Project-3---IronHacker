import React from 'react'

import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEye, faEdit } from '@fortawesome/free-solid-svg-icons'
import './Post-card.css'
const Comments = ({ loggedInUser, _id, owner, createdAt, content, tags, deleteButton, updateWall, handleEditionModal, editPostButton, deleteCommentButton }) => {
    return (
        <>
           

                                            <Card>
                                                <Card.Header> <Link to={`/user/${owner._id}`}>
                                                    <Card.Title>
                                                        <Image className="avatar" src={owner.avatarUrl} />
                                                        {owner.name} {owner.surname}
                                                    </Card.Title>
                                                </Link>
                                                    {loggedInUser.role !== 'ADMIN' && loggedInUser._id !== owner._id ? '' : <div onClick={() => deleteCommentButton(_id)}>
                                                        <FontAwesomeIcon icon={faTrashAlt} size="lg" /></div>}

                                                </Card.Header>
                                                <Card.Body>
                                                    <blockquote className="blockquote mb-0">
                                                        <p>
                                                            {content}
                                                        </p>
                                                        <footer className="blockquote-footer">
                                                            {createdAt}
                                                        </footer>
                                                    </blockquote>
                                                </Card.Body>
                                            </Card>
                                      
            </>
    )
    
}
export default Comments