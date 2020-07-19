module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/users', require('./auth.routes.js'))
}