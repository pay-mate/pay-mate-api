const Group = require ('../models/group.model');
const Payments = require ('../models/payment.model');
const Result = require('../models/result.model');
const Users = require ('../models/user.model');
const DebtCalculatorService = require('../services/debt-calculator.service');
const createError = require('http-errors');


module.exports.create = (req,res,next)=> {
    const group = new Group (req.body);
    group.admin = req.user.id;
    group.save()
    .then(group => res.status(201).json(group))
    .catch(error => next (error));
}

module.exports.list = (req,res,next) => {
    Group.find({admin: req.user.id})
        .populate({ path: 'payments', populate: { path: 'payer'}})
        .populate({ path: 'users' })
        .then(groups => res.json(groups))
        .catch(error => next(error));
}

module.exports.select = (req,res,next) => {
    Group.findById(req.params.id)
    .populate({ path: 'payments', populate: { path: 'payer'}})
    .populate({ path: 'users' })
    .then(group => res.json(group))
    .catch(error => next(error));
}

module.exports.update = (req, res, next) => {
    const id = req.params.id;
  
    Group.findById(id)
    .populate({ path: 'payments', populate: { path: 'payer'}})
    .populate({ path: 'users' })
      .then(group => {
        if (group) {
          Object.assign(group, {
            name: req.body.name
          });
  
          group.save()
            .then(() => {
              res.json(group);
            })
            .catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                next(createError(400, error.errors));
              } else {
                next(error);
              }
            })
        } else {
          next(createError(404, `Group not found`));
        }
      })
      .catch(error => next(error));
  }

module.exports.delete = (req,res,next) => {
    Group.findByIdAndRemove({admin:req.params.userId ,_id: req.params.id}) 
    .then(() => {
        res.status(204).json()
    })
    .catch(error => next (error));
}   

module.exports.result = (req,res,next) => {
    Promise.all([
        Result.find({ group: req.params.id }),
        Payments.find({ group: req.params.id }),
        Users.find({ group: req.params.id })
        .populate({ path: 'users' })  
    ])
    .then(([results, payments, users]) => {
        // payments -> deudores [], pagadores [] -> ObjectId
        // users -> objects id
        const result = new DebtCalculatorService(users, payments).calculateDebts();
        res.json({ result })
    })
    .catch(error => next(error));
}