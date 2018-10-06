const Group = require ('../models/group.model');
const mongoose = require ('mongoose');
const Payments = require ('../models/payment.model');
const Users = require ('../models/user.model');
const DebtCalculatorService = require('../services/debt-calculator.service');

module.exports.create = (req,res,next)=> {
    const group = new Group (req.body);
    group.admin = req.user.id;

    group.save()
    .then(group => res.status(201).json(group))
    .catch(error => next (error));
}

module.exports.list = (req,res,next) => {
    Group.find({admin: req.user.id})
    .then(groups => res.json(groups))
    .catch(error => next(error));
}

module.exports.select = (req,res,next) => {
    Promise.all([
        Group.findById(req.params.id),
        Payments.find({ group: req.params.id }),
        Users.find({ group: req.params.id })
    ])
    .then(([group, payments, users]) => res.json({ payments, group, users }))
    .catch(error => next(error));
}

module.exports.result = (req,res,next) => { 
    Promise.all([
        Group.findById(req.params.id),
        Payments.find({ group: req.params.id }),
        Users.find({ group: req.params.id })
    ])
    .then(([group, payments, users]) => {
        const result = new DebtCalculatorService(users, payments, group).calculate();

        res.json({ result })
    })
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

