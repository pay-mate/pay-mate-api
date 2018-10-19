const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({

    name: {
        type: String,
        minlength: [3, ' The group name must contain at least 3 characters']
    },

    admin: {
        type: mongoose.Schema.Types.ObjectId,//ObjectId = enlace a otro doc. 
        ref: 'Admin'
    },

    image: {
        type: String,
        required: true,
        default: 'https://www.bahamas.com/sites/default/files/styles/3_2_teaser/public/pinksand.jpg'
    }

}, {
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id;

            if (!ret.payments) {
                ret.payments = [];
            }

            return ret;
        }
    }
});

groupSchema.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'group',
    options: { sort: { date: -1 } }
})

groupSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'group',
    options: { sort: { date: -1 }}
})

// groupSchema.virtual('result', {
//     ref: 'Result',
//     localField: '_id',
//     foreignField: 'group',
//     options: { sort: { date: -1 }}
// })

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;




