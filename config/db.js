const mongoose = require('mongoose')

const URL = 'mongodb://bhavikpr:HIpoVHHYoNA6H4DvWrNe85@15.206.7.200:28017/bhavikpr?authMechanism=DEFAULT&authSource=admin'

mongoose.connect(URL)
    .then((result) => {
        console.log('mongoDB Connected.')    
    }).catch((err) => {
        console.log(err)
    });

module.exports = mongoose