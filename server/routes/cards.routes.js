const express = require('express')
const router = express.Router()

const Card = require('../models/Card.model')
const User = require('../models/User.model')

// Endpoints
//Deploy de list of posts
router.get('/getAllCards', (req, res, next) => {

    Card.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})
//selects one post
router.get('/getOneCard/:card_id', (req, res, next) => {

    Card.findById(req.params.card_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})
//creates one post
router.post('/newCard', (req, res, next) => {

    if (req.user.role === 'STUDENT') {
        res.status(401).json({ message: 'Unauthorized' })
        return;
    }
    const { content, tags, createdAt, comments } = req.body

    Card.create({
        owner: req.user.id,
        content,
        tags,
        createdAt,
        comments
    })
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))
})
//deletes one post
router.delete('/:card_id', (req, res, next) => {

    Card.findById(req.params.card_id)
        .then(card => {
            if (req.user.role !== 'ADMIN' && req.user.id !== card.owner) {
                res.status(403).json({ message: 'Forbidden' })
                return
            }
            return card.remove()
        })
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))

})
//creates one comment
// router.post('/users/:userId/comments', (req, res, next) => {



// })



module.exports = router