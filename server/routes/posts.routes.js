const express = require('express')
const router = express.Router()
const moment = require('moment')
const _ = require("lodash")

const Post = require('../models/Post.model')
const User = require('../models/User.model')
const Comment = require('../models/Comments.model')
const { response } = require('express')

// Endpoints
//Deploy de list of posts
router.get('/getAllPosts', (req, res, next) => {

    Post.find()
        .populate('owner', ['name', 'surname', 'avatarUrl'])
        .populate({ path: 'comments', populate: {
                path: 'owner', model: 'User'
            }, 
        })
        // .populate('comments', ['_id', 'content', 'createdAt'])
    
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
        createdAt: moment(createdAt).format('MMMM Do YYYY'),
        comments
    })
        .then(response => res.json(response))
        .catch(err => next(err))
})
//deletes one post
router.delete('/:post_id', (req, res, next) => {
    //hacer middleware para chequear usuario

    Post.findById(req.params.post_id)
        .then(post => {


            // if (req.user.role !== 'ADMIN' && req.user.id !== post.owner._id) {
            //     res.status(403).json({ message: 'Forbidden' })
            //     return
            // }
            // return
            post.remove()
        })
        .then(response => res.json(response))
        .catch(err => next(err))

})
//Edits one post
router.patch('/:post_id', (req, res, next) => {

    const editableFields = ['content', 'tags', 'createdAt']
    const fields = _.pick(req.body, editableFields)
    const postId = req.params.post_id
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'Unauthorized' })
        return;
    }
    // if (req.user.role !== 'ADMIN' && req.user.id !== req.body.owner) {
    //     res.status(403).json({ message: 'Forbidden' })
    //     return;
    // }
    Post.findByIdAndUpdate(postId, { $set: fields }, { new: true })
        .then((data) => res.status(200).json(data))
        .catch(err => next(err))
})
//Selects posts by tags
router.get('/postByTags', (req, res, next) => {
    
    const tags = req.query.tags.split(',')
    console.log('traza busqueda', JSON.stringify(req.query.tags, null, 2))
    Post.find({ tags: tags })
        .populate('owner', ['name', 'surname', 'avatarUrl'])
        .populate({
            path: 'comments', populate: {
                path: 'owner', model: 'User'
            },
        })
        .then(response => res.json(response))
        .catch(err => next(err))

})

//pushes a new comment into the post
router.post('/commentToPost/:post_id', (req, res, next) => {
    const postId = req.params.post_id
    const { content, createdAt } = req.body
    Comment.create({
        owner: req.user.id,
        content,
        createdAt: moment(createdAt).format('MMMM Do YYYY'),
    })
        .then(result => Post.findByIdAndUpdate(postId, {
            $push: {
                "comments": result._id
            }
        }, { new: true, upsert: true }))
        .then(response => res.json(response))
        .catch(err => next(err))

})
//Deletes a Comment
router.delete('/comment/:comment_id', (req, res, next) => {
    //hacer middleware para chequear usuario

    Comment.findById(req.params.comment_id)
        .then(comment => {
            // if (req.user.role !== 'ADMIN' && req.user.id !== comment.owner) {
            //     res.status(403).json({ message: 'Forbidden' })
            //     return
            // }
            return comment.remove()
        })
        .then(response => res.json(response))
        .catch(err => next(err))

})
// Edits one Comment--->por probar
// router.patch('/:comment_id', (req, res, next) => {
//     Comment.findByIdAndUpdate(req.params.post_id)
//         .then((data) => res.status(200).json(data))
//         .catch(err => next(err))
// })


//Deploy the list of users
router.get('/getAllUsers', (req, res, next) => {

    User.find()
        .then(response => res.json(response))
        .catch(err => next(err))
})

//selects one user

router.get('/getOneUser/:user_id', (req, res, next) => {

    User.findById(req.params.user_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})




module.exports = router