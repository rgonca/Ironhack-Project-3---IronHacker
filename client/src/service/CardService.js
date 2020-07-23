import axios from 'axios'

export default class CoasterService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/cards',
            withCredentials: true
        })
    }
    getAllCards = () => this.service.get('/getAllCards')
    getOneCard = id => this.service.get(`/getOneCard/${id}`)
    createCard = card => this.service.post(`/newCard`, card)
}