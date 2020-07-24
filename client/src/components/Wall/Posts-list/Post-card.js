import React from 'react'

// import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const PostCard = ({ _id, owner, createdAt, content }) => {
    // const Date = (createdAt) => {
    //     const fixedDate = new Date(createdAt)
    //     return fixedDate.getFullYear() + 
    // }
    return (
        <Col md={4}>
            <Card className="post-card">
                <Card.Body>
                    <Card.Title><Image className="avatar" src={owner.avatarUrl}/>
                        {owner.name},{owner.surname}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Aqui la fecha de publicacion {createdAt}</Card.Subtitle>
                    <Card.Text>y aqui el contenido {content}</Card.Text>
                </Card.Body>
            </Card>  
        </Col>
    )
}

export default PostCard