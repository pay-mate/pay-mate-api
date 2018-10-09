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

const User = mongoose.model('User',userSchema);

module.exports = User ;

