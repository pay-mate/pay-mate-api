const User = require ('../models/user.model');
const createError = require('http-errors');


module.exports.create = (req, res, next) => {
    const user = new User (req.body);
    user.group = req.params.groupId;
    user.save()
    .then(user => res.status(201).json(user))
    .catch(error => next (error));
}


module.exports.list = (req,res,next) => {
    User.find({ group: req.params.groupId })
    .populate('payments')
        .then( users => res.json(users))
        .catch(error => next(error));
}

module.exports.select = (req, res, next) => {
    User.findById({_id: req.params.id, group: req.params.groupId})
    .populate('payments')
    .then(user => {
        if(!user){
            throw createError(404,'User not found')
        }else{
            res.json(user);
        }})
        .catch(error => next(error));

}

module.exports.update = (req, res, next) => {
    const id = req.params.id;
  
    User.findById(id)
    .populate('payments')
      .then(user => {
        if (user) {
          Object.assign(user, {
            name: req.body.name,
            image: req.body.image
          });
  
          user.save()
            .then(() => {
              res.json(user);
            })
            .catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                next(createError(400, error.errors));
              } else {
                next(error);
              }
            })
        } else {
          next(createError(404, `User not found`));
        }
      })
      .catch(error => next(error));
  }


module.exports.delete = (req, res, next) => {
    User.findByIdAndRemove(req.params.id) 
    .then(() => {
        res.status(204).json()
    })
    .catch(error => next (error));
}

