const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const SALT_FACTOR = 10;

const adminSchema = new mongoose.Schema ({
    email:{
        type: String,
        requiered: 'The email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true,
    },
    password: {
        type: String,
        requiered: 'The password is required',
        minlength: [6, ' The group name must contain at least 6 characters']
    }
})

adminSchema.pre('save', function save(next) {
    const admin = this;
    if (!admin.isModified('password')) {
      next();
    } else {
      bcrypt.genSalt(SALT_FACTOR)
        .then(salt => {
          return bcrypt.hash(admin.password, salt)
        })
        .then(hash => {
          admin.password = hash;
          next();
        })
        .catch(error => next(error));
    }
    
  });
  
  adminSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  }
  
  const Admin = mongoose.model('Admin', adminSchema);
  module.exports = Admin; 


