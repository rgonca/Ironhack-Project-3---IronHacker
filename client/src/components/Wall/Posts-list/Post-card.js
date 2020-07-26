import React from 'react'

import { Link } from 'react-router-dom'

import './Post-card.css'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrashAlt  } from '@fortawesome/free-solid-svg-icons'


const PostCard = ({ loggedInUser, _id, owner, createdAt, content, tags, deleteButton }) => {
    // const Date = (createdAt) => {
    //     const fixedDate = new Date(createdAt)
    //     return fixedDate.getFullYear() + 

    return (
        
        <Col md={8}>
            <Card className="post-card">
                <Card.Body>
                    <Link to={`/user/${owner._id}`}>
                    <Card.Title>
                        
                        <Image className="avatar" src={owner.avatarUrl} />
                        {owner.name} {owner.surname}
                    </Card.Title>
                    </Link>
                    <Card.Subtitle className="mb-2 text-muted">{createdAt}</Card.Subtitle>
                    <Card.Text>{content}</Card.Text>
                    <Card.Footer className="text-muted">
                        {['lg'].map((breakpoint, idx) => (
                            <ListGroup className="tags" horizontal={breakpoint} className="my-2" key={idx}>
                                {tags.map(tags => (
                                    <ListGroup.Item key={tags}>{tags}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        ))}
                        {loggedInUser.role !== 'ADMIN' && loggedInUser._id !== owner._id ? '' : <div onClick={() => deleteButton(_id)}><FontAwesomeIcon icon={faTrashAlt} size="lg" /></div>}
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default PostCard