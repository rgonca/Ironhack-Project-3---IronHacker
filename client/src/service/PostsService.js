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
    deletePost = id => this.service.delete(`/${id}`)
    getAllUsers = id => this.service.get('/getAllUsers')
}