const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    available: Boolean,
    rentStarted: Number
})

module.exports = model( 'Bike', schema)