const mongoose = require('mongoose')

mongoose
    // .connect(`mongodb://localhost/${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .connect(process.env.DB_REMOTE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))

module.exports = mongoose

// DB_LOCAL = mongodb://localhost/IronHacker
// DB_REMOTE = mongodb + srv://rgonca:Nomejodas183@cluster0.p5uzg.mongodb.net/IronHacker?retryWrites=true&w=majority