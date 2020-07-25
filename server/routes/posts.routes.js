const express = require('express')
const router = express.Router()

const Post = require('../models/Post.model')
const User = require('../models/User.model')

// Endpoints
//Deploy de list of posts
router.get('/getAllPosts', (req, res, next) => {

    Post.find().populate('owner', ['name', 'surname','avatarUrl'])
        .then(response => res.json(response))
        .catch(err => next(err))
})
//selects one post
router.get('/getOnePost/:post_id', (req, res, next) => {

    Post.findById(req.params.post_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})
//creates one post
router.post('/newPost', (req, res, next) => {
//chequear usuario loggeado
    if (req.user.role === 'STUDENT') {
        res.status(401).json({ message: 'Unauthorized' })
        return;
    }
    const { content, tags, createdAt, comments } = req.body

    Post.create({
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
router.delete('/:post_id', (req, res, next) => {
    //hacer middleware para chequear usuario

    Post.findById(req.params.post_id)
        .then(post => {
            if (req.user.role !== 'ADMIN' && req.user.id !== post.owner) {
                res.status(403).json({ message: 'Forbidden' })
                return
            }
            return post.remove()
        })
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))

})
//creates one comment
// router.post('/users/:userId/comments', (req, res, next) => {



// })
router.get('/getAllUsers', (req, res, next) => {

    User.find()
        // .populate('owner', ['name', 'surname', 'avatarUrl'])
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router