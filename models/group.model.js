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

});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;




