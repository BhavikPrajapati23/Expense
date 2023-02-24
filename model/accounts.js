const mongoose = require('mongoose')

accountSchema = new mongoose.Schema({
    name: String,
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
})

module.exports = new mongoose.model('account',accountSchema)