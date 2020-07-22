const express = require('express')
const router = express.Router()

const Card = require('../models/Card.model')

// Endpoints
router.get('/getAllCards', (req, res, next) => {

    Card.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get('/getOneCard/:card_id', (req, res, next) => {

    Card.findById(req.params.card_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/newCard', (req, res, next) => {
    const {
        date
    } = req.body
    Card.create({
        owner: req.user.id,
        date: moment(date).format("MMM Do YY")
    })
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))
})

router.get('/deleteCard', (req, res, next) => {
    
    Card.findByIdAndDelete(req.query.id)
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))
})



module.exports = router