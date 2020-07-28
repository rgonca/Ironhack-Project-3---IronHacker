import React from 'react'

import { Link } from 'react-router-dom'

import CreateComment from '../Create-comment'
import EditPost from '../Edit-post'
import Comments from './comments'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import './Post-card.css'



const PostCard = ({ loggedInUser, _id, owner, createdAt, content, tags, deleteButton, comments, updateWall, handleEditionModal, editPostButton }) => {

    return (

        <Col md={8}>
            <Card className="post-card">
                <Card.Header>
                    {loggedInUser.role !== 'ADMIN' && loggedInUser._id !== owner._id ? '' : <div onClick={() => deleteButton(_id)}><FontAwesomeIcon icon={faTrashAlt} size="lg" /></div>}
                    <div onClick={(() => handleEditionModal(true)) }  ><FontAwesomeIcon icon={faEye} size="lg" /></div>

                </Card.Header>
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
                        <Accordion>
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
                                                    {comments.reverse().map(comments => (
                                                        <ListGroup.Item key={comments}>
                                                            <Card>
                                                                <Card.Header> <Link to={`/user/${comments.owner}`}>
                                                                    <Card.Title>
                                                                        {comments.owner}
                                                                    </Card.Title>
                                                                </Link></Card.Header>
                                                                <Card.Body>
                                                                    <blockquote className="blockquote mb-0">
                                                                        <p>
                                                                            {comments.content}
                                                                        </p>
                                                                        <footer className="blockquote-footer">
                                                                            {comments.createdAt}
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
                        </Accordion>
                        <CreateComment id={_id} updateWall={updateWall} />



                    </Card.Footer>
                </Card.Body>
            </Card>
        </Col>

    )
}

export default PostCard