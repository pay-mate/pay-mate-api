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

    users: {
        type: [{
            name: {
                type: String,
                required: 'User needs a name',
            }
        }],
        default: []

    },

    payments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Payment'
    }

});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;




