

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    },
    password: {
        type: String,
        minlength: 3,
        required: true
    },
    email: {
        type: String,
        // unique: true,
        // trim: true,
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['STUDENT', 'ALUMNI', 'ADMIN'],
        default: 'STUDENT'
    },
    bootcamp: {
        type: String,
        enum: ['Web Development',
            'UX/UI Desing',
            'Data Analytics'],
        required: true
    },
    bootcampCity: {
        type: String,
        enum: ['Madrid',
            'Barcelona',
            'Miami',
            'Paris',
            'Mexico City',
            'Berlin',
            'Amsterdam',
            'Sao Paulo',
            'Lisbon',
            'Remote'],
        required: true
    },
    bootcampDate: {
        type: Date,
        // required: true
    },
    bootcampMode: {
        type: String,
        enum: ['Full Time', 'Part Time'],
        required: true
    },
    avatarUrl: {
        type: String,
        default: './../public/images/default-avatar.png'
    },
    linkedinProfile: {
        type: String,
        validate: {
            validator: (text) => {
                return text.indexOf('https://www.linkedin.com/') === 0;
            },
            message: "linkedinProfile must start with 'https://www.linkedin.com/'"
        }
    },
    githubProfile: {
        type: String,
        validate: {
            validator: (text) => {
                return text.indexOf('https://www.github.com/') === 0;
            },
            message: "githubProfile must start with 'https://www.github.com/'"
        }
    },
    projectTitle: String,
    projectDescription: String,
    projectLink: String,
    warName: String,
    funFact: String


}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User