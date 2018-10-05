const Group = require ('../models/group.model');
const mongoose = require ('mongoose');

module.exports.create = (req,res,next)=> {
    const group = new Group (req.body);
    group.admin = req.user.id;

    group.save()
    .then(group => res.status(201).json(group))
    .catch(error => next (error));
}

module.exports.list = (req,res,next) => {
    Group.find({admin:req.user.id})
    .then(groups => res.json(groups))
    .catch(error => next(error));

}

module.exports.select = (req,res,next) => {
    Group.findById({admin:req.params.userId, _id : req.params.id}
)
    .then(group => {
        if(!group){
            throw createError(404,'group not found')
        }else{
            res.json(group);
        }})
        .catch(error => next(error));
}

module.exports.update = (req,res,next) => {
    Group.findById({admin:req.params.userId,_id: req.params.id})
    .then(group =>{
        if (!group){
            throw createError(404, 'group not found')
        }else{
            group.save()
            .then(group => res.status(200).json(group))
            .catch(error => next (error));
        }
    })
    .catch(error => next (error));
}

module.exports.delete = (req,res,next) => {
    Group.findByIdAndRemove({admin:req.params.userId ,_id: req.params.id}) 
    .then(() => {
        res.status(204).json()
    })
    .catch(error => next (error));
}   

