const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    
    subject: {
        type: String,
        minlength: [3, ' The payment name must contain at least 3 characters'],
        required: true
    },

        amount: {
        type: Number,
        required: 'The amount is required'
    },

        date: {
        type: Date,
        default: Date.now,
        required: 'The date is required'
    },

        status: {
        type: String,

        enum: ['PENDING', 'PAYED'],
        default: ['PENDING'],
        required: true
    },

        payer: {
        type: mongoose.Schema.Types.ObjectId,// Usuario que paga
        ref: 'User',
        required: 'Payment needs a payer'
    },

    image: {
        type: String,
        required: true,
        default: 'https://image.freepik.com/vector-gratis/plantilla-factura-moderna-estilo-ondulado_1017-14520.jpg'
    }

}, {
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id;
            return ret;
        }
    }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;