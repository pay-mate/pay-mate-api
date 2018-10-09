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

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;




