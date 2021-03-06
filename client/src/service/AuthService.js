
import axios from 'axios'

export default class AuthService {

    constructor() {

        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    login = credentials => this.service.post('/login', credentials)
    signup = credentials => this.service.post('/signup', credentials)
    logout = () => this.service.post('/logout')
    isLoggedIn = () => this.service.get('/loggedin')
    getUser = (id) => this.service.get(`/users/${id}`)
    editUser = (id, credentials) => this.service.patch(`/users/${id}`, credentials)//fue modificado

}
//'http://localhost:5000/api'