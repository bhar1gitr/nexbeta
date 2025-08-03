const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    assignedTo: {type:mongoose.Schema.Types.ObjectId, ref:'User' },
    products: Array,
}, { timestamps: true })

module.exports = mongoose.model('Card', cardSchema)