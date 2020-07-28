const mongoose = require('mongoose');
const dbName = 'IronHacker'

mongoose.connect(`mongodb://localhost/${dbName}`)


// mongoose.connect(`mongodb+srv://${process.env.rgonca}:${process.env.Nomejodas183}@revitalize-oltwc.gcp.mongodb.net/${process.env.IronHacker}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASSWORD}@revitalize-oltwc.gcp.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
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

    },
    {
        username: 'admin2',
        password: '$2b$10$3cTXPx0ddbLDd6553clmje/FksFNlpGc6BoTVsAHS.0upUbAtcnbK',
        email: 'masterOfTheApp@skynet.com',
        name: 'Skynet',
        surname: 'datamaster',
        role: 'ADMIN',
        bootcamp: 'Data Analytics',
        bootcampCity: 'Miami',
        bootcampMode: 'Full Time',
        avatarUrl: 'https://i1.sndcdn.com/avatars-000757676722-7wm5la-t500x500.jpg',
        projectTitle: 'This Directory',
        projectDescription: 'One bootcamp to rule them all, One bootcamp to find them, One bootcamp to bring them all and in the darkness bind them.',
        warName: 'Twinkle Toes',
        funFact: 'Only Mom can say my nickname, you do it... you die'

    },
    {
        username: 'admin1',
        password: '$2b$10$3cTXPx0ddbLDd6553clmje/FksFNlpGc6BoTVsAHS.0upUbAtcnbK',
        email: 'iamcharlie@candymountain.com',
        name: 'Charlie',
        surname: 'the unicorn',
        role: 'ADMIN',
        bootcamp: 'UX/UI Desing',
        bootcampCity: 'Barcelona',
        bootcampMode: 'Full Time',
        avatarUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bb6e5219-f324-478a-bb31-081f4c26060e/dhry97-f134bb71-410e-45cd-ab6e-f3e3b87ba09d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYmI2ZTUyMTktZjMyNC00NzhhLWJiMzEtMDgxZjRjMjYwNjBlXC9kaHJ5OTctZjEzNGJiNzEtNDEwZS00NWNkLWFiNmUtZjNlM2I4N2JhMDlkLmpwZyJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl19.A5NTZ_fNSluEDoKeDDJeN69Owp4OHKkf2pRsXyrSE60',
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
