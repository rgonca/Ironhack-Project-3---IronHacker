import axios from 'axios'

export default class PostsService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/posts',
            withCredentials: true
        })
    }
    getAllPosts = () => this.service.get('/getAllPosts')
    getOnePost = id => this.service.get(`/getOnePost/${id}`)
    createPost = post => this.service.post(`/newPost`, post)
    filterPosts = tags => this.service.get(`/postByTags?tags=${tags}`) 
    editPosts = (id, data) => this.service.patch(`/${id}`, data)
    deletePost = id => this.service.delete(`/${id}`)
    getAllUsers = () => this.service.get('/getAllUsers')
    getOneUser = id => this.service.get(`/getOneUser/${id}`)
    commentToPost = (id, comment) => this.service.post(`/commentToPost/${id}`, comment)
    deleteComment = id => this.service.delete(`/comment/${id}`)
}