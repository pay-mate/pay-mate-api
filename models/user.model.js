const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },

    name: {
        type: String, 
        required: true
    },
        image: {
        type: String,
        required: true,
        default: 'https://thumbs.dreamstime.com/b/icono-masculino-de-la-imagen-del-perfil-del-avatar-del-defecto-placeholder-gris-de-la-foto-del-hombre-88414414.jpg'
    }

}, {
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id;

            if (!ret.payments) {
                ret.payments = []
            }

            return ret;
        }
    }
});

userSchema.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'payer',
    options: { sort: { date: -1 } }
})

const User = mongoose.model('User',userSchema);

module.exports = User ;

