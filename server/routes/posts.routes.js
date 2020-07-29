const express = require('express')
const router = express.Router()
const moment = require('moment')
const _ = require("lodash")

const Post = require('../models/Post.model')
const User = require('../models/User.model')
const Comment = require('../models/Comments.model')
const { response } = require('express')
const { compact, result } = require('lodash')

// Endpoints
//Deploy de list of posts
router.get('/getAllPosts', (req, res, next) => {

    Post.find()
        .populate('owner', ['name', 'surname', 'avatarUrl'])
        .populate('comments', ['_id', 'owner', ['name'], 'content', 'createdAt'])
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
console.log('traza las tags', req.body);
    Post.create({
        owner: req.user.id,
        content,
        tags,
        createdAt: moment(createdAt).format('MMMM Do YYYY'),
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
            console.log('elusuario', req.user.id);
            console.log('eldueño', post.owner._id);

            // if (req.user.role !== 'ADMIN' && req.user.id !== post.owner._id) {
            //     res.status(403).json({ message: 'Forbidden' })
            //     return
            // }
            // return
            post.remove()
        })
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))

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
    console.log('traza el usuario', req.params);
    // if (req.user.role !== 'ADMIN' && req.user.id !== req.body.owner) {
    //     res.status(403).json({ message: 'Forbidden' })
    //     return;
    // }
    Post.findByIdAndUpdate(postId, { $set: fields }, { new: true })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err))
})
//Selects posts by tags
router.get('/postByTags/:tags', (req, res, next) => {

    Post.find({ tags: { $eq: req.params.tags } })
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))

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
        .catch(err => next(new Error(err)))

})
//Deletes a Comment
router.delete('/comment/:comment_id', (req, res, next) => {
    //hacer middleware para chequear usuario

    Comment.findById(req.params.comment_id)
        .then(comment => {
            if (req.user.role !== 'ADMIN' && req.user.id !== comment.owner) {
                res.status(403).json({ message: 'Forbidden' })
                return
            }
            return comment.remove()
        })
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))

})
//Edits one Comment--->por probar
router.patch('/:comment_id', (req, res, next) => {
    Comment.findByIdAndUpdate(req.params.post_id)
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err))
})

// router.get('/:post_id/getallcomments', (req, res, next) => {

//     Comment.find().populate('owner', ['name', 'surname', 'avatarUrl'])
//         .then(response => res.json(response))
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