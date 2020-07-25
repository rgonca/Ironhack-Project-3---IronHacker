const express = require("express")
const passport = require("passport")
const bcrypt = require("bcrypt")
const _ = require("lodash")
const User = require("../models/User.model")

const router = express.Router()



router.post('/signup', (req, res, next) => {

    const { username,
        password,
        email,
        name,
        surname,
        role,
        bootcamp,
        bootcampCity,
        bootcampDate,
        bootcampMode,
        avatarUrl,
        linkedinProfile,
        githubProfile,
        projectTitle,
        projectDescription,
        projectLink,
        warName,
        funFact
    } = req.body


    if (!username || !password) {
        res.status(400).json({ message: 'Provide username and password' })
        return
    }

    if (password.length < 2) {
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' })
        return
    }

    User.findOne({ username }, (err, foundUser) => {

        if (err) {
            res.status(500).json({ message: "Username check went bad." })
            return
        }

        if (foundUser) {
            res.status(400).json({ message: 'Username taken. Choose another one.' })
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password, salt)

        const aNewUser = new User({
            username: username,
            password: hashPass,
            email: email,
            name: name,
            surname: surname,
            role: role,
            bootcamp: bootcamp,
            bootcampCity: bootcampCity,
            bootcampDate: bootcampDate,
            bootcampMode: bootcampMode,
            avatarUrl: avatarUrl,
            linkedinProfile: linkedinProfile,
            githubProfile: githubProfile,
            projectTitle: projectTitle,
            projectDescription: projectDescription,
            projectLink: projectLink,
            warName: warName,
            funFact: funFact,


        })

        aNewUser.save(err => {
            if (err) {
                console.log('traza', '“errorrrr”', err)
                res.status(400).json({ message: 'Saving user to database went wrong.' })
                return
            }

            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' })
                    return
                }

                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser)
            });
        });
    });
});






router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' })
            return
        }

        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails)
            return
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' })
                return
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser)
        })
    })(req, res, next)
})



router.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout()
    res.status(200).json({ message: 'Log out success!' })
});


router.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user)
        return;
    }
    res.status(403).json({ message: 'Unauthorized' })
});

//User Edition

router.get('/users/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err))
})

router.patch('/users/:id', (req, res, next) => {

    const allowedFields = [
        'name',
        'surname',
        'role',
        'avatarUrl',
        'linkedinProfile',
        'githubProfile',
        'projectTitle',
        'projectDescription',
        'projectLink',
        'warName',
        'funFact'
    ]

    const fields = _.pick(req.body, allowedFields)
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'Unauthorized' })
        return;
    }
    const userId = req.params.id
    if (req.user.role !== 'ADMIN' && userId !== req.user.id) {
        res.status(403).json({ message: 'Forbidden' })
        return;
    }


    User.findByIdAndUpdate(userId, { $set: fields }, { new: true })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err))
})





module.exports = router
