const mongoose = require('mongoose');
const dbName = 'IronHacker'

mongoose.connect(`mongodb://localhost/${dbName}`)

const User = require('../models/User.model')

const administrator = [
    {
        username: 'admin',
        password: '$2b$10$3cTXPx0ddbLDd6553clmje/FksFNlpGc6BoTVsAHS.0upUbAtcnbK',
        email: 'masterOfTheApp@overlord.com',
        name: 'Overlord',
        surname: 'Darklord',
        role: 'ADMIN',
        bootcamp: 'Web Development',
        bootcampCity: 'Madrid',
        bootcampMode: 'Full Time',
        avatarUrl: 'https://avatarfiles.alphacoders.com/914/91443.png',
        projectTitle: 'This Directory',
        projectDescription: 'One bootcamp to rule them all, One bootcamp to find them, One bootcamp to bring them all and in the darkness bind them.',
        warName: 'Twinkle Toes',
        funFact: 'Only Mom can say my nickname, you do it... you die'

    }
]

User.create(administrator, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${administrator.length}`)
    mongoose.connection.close()
})
