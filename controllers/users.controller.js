const User = require ('../models/user.model');
const createError = require('http-errors');


module.exports.create = (req, res, next) => {
    const user = new User (req.body);
    user.save()
    .then(user => res.status(201).json(user))
    .catch(error => next (error));
}


module.exports.list = (req,res,next) => {
    User.find()
        .then( users => res.json(users))
        .catch(error => next(error));
}

module.exports.select = (req, res, next) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user){
            throw createError(404,'User not found')
        }else{
            res.json(user);
        }})
        .catch(error => next(error));

}

module.exports.update = (req, res, next) => {
    User.findById(req.params.id)
        user.save()
        .then(user =>{
            if (!user){
                throw createError(404, 'User not found')
            }else{
                user.save()
                .then(user => res.status(200).json(user))
                .catch(error => next (error));
            }
        })
        .catch(error => next (error));
    }

module.exports.delete = (req, res, next) => {
    User.findByIdAndRemove(req.params.id) 
    .then(() => {
        res.status(204).json()
    })
    .catch(error => next (error));
}