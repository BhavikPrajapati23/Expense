const mongoose = require('mongoose')

transactionSchema = new mongoose.Schema({
    accountname: String,
    category: String,
    amount: Number,
    transaction: {type: String, possibleValues: ['income','expense']},
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    accountId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    }],
    createdAt: {type: Date, default: Date.now},
})

module.exports = new mongoose.model('transaction',transactionSchema)