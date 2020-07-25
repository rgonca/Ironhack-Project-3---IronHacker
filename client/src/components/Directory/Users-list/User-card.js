import React from 'react'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import PostCard from '../../Wall/Posts-list/Post-card'

const UserCard = ({ avatarUrl, name, surname, role, bootcamp, }) => {

    return (
        <Card className="post-card">
            <Card.Body>
                <Card.Title>
                    <Image className="avatar" src={avatarUrl} />
                    {name} {surname}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{bootcamp}, {role}</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export default UserCard