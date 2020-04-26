const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ListSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ""
    },
    login: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "unknown"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = List = mongoose.model('list', ListSchema)