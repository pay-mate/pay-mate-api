const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({

    debtor: String,
    destination: String,
    amount: Number,

    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    }

  }, {  toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id;

            if (!ret.users) {
                ret.users = []
            }

            return ret;
        }
    }

});

resultSchema.virtual('users', {
    ref: 'User',
    localField: 'debtor',
    foreignField: '_id',
    options: { sort: { date: -1 } }
})

resultSchema.virtual('users', {
    ref: 'User',
    localField: 'destination',
    foreignField: '_id',
    options: { sort: { date: -1 } }
})

const Result = mongoose.model('Result',resultSchema);

module.exports = Result ;

