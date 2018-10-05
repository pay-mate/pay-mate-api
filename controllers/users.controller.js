const User = require ('../models/user.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  User.find()
    .then(user => res.json(user))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        throw createError(409, `User with email ${req.body.email} already exists`);
      } else {
        user = new User(req.body);
        user.save()
          .then(user => res.status(201).json(user))
          .catch(error => {
            next(error)
          });
      }
    })
    .catch(error => next(error));
}

  module.exports.delete = (req, res, next) => {
    const id = req.params.id;
    
    User.findByIdAndDelete(id)
      .then(() => {
        res.status(204).json()
      })
      .catch(error => next(error));
  }