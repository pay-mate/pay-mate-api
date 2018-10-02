const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: 'Please insert human readable concept'
    },

    amount: {
        type: Number,
        required: 'The amount is required'
    },

    date: {
        type: Date,
        default: Date.now
    },

    image: String, //¿Buffer?

    status: {
        type: String,
        enum: ['PENDING', 'PAYED']
    },

    payer: {
        type: mongoose.Schema.Types.ObjectId,// Usuario que paga
        required: 'Deb needs a payer'
    },

    debtors: {
        type: [mongoose.Schema.Types.ObjectId], // Usuarios que deben dinero al payer
        default: []
    },

})

const Debt = mongoose.model('Debt', debtSchema)
module.export = Debt;