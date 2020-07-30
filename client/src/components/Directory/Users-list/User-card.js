
import React from 'react'

import { Link } from 'react-router-dom'


import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'


const UserCard = ({ _id, avatarUrl, name, surname, role, bootcamp, }) => {

    return (
        <Col md={4}>
            <Card className="user-card" bg="light" border="secondary">
                <Card.Body className="userCard">
                    <Link to={`/user/${_id}`}>
                        <Image className="avatarlist" src={avatarUrl} />
                        <Card.Title>
                         {name} {surname}
                        </Card.Title></Link>
                    <Card.Subtitle className="mb-2 text-muted">{bootcamp}
                        <hr></hr>
                        {role}</Card.Subtitle>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default UserCard