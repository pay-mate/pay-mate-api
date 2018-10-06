const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    subject: {
        type: String,
        minlength: [3, ' The group name must contain at least 3 characters']
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

        enum: ['PENDING', 'PAYED'],
        default: ['PENDING'],
        required: true
    },

        payer: {
        type: mongoose.Schema.Types.ObjectId,// Usuario que paga
        required: 'Deb needs a payer'
    },

        debtors: {
        type: [mongoose.Schema.Types.ObjectId], // Usuarios que deben dinero al payer
        default: []
    },

});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;