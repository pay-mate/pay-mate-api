const Payments = require ('../models/payments.model');

module.exports.create = (req,res,next)=> {
    const payments = new Payments (req.body);
    // payments.admin = req.user.id;

    payments.save()
    .then(payments => res.status(201).json(payments))
    .catch(error => next (error));
}

module.exports.list = (req,res,next) => {
    Payments.find()
    .then(groups => res.json(groups))
    .catch(error => next(error));

}

module.exports.select = (req,res,next) => {
    Payments.findById(req.params.id)
    .then(payments => {
        if(!payments){
            throw createError(404,'payments not found')
        }else{
            res.json(payments);
        }})
        .catch(error => next(error));
}

module.exports.update = (req,res,next) => {
    Payments.findById(req.params.id)
    .then(payments =>{
        if (!payments){
            throw createError(404, 'payments not found')
        }else{
            payments.save()
            .then(payments => res.status(200).json(payments))
            .catch(error => next (error));
        }
    })
    .catch(error => next (error));
}

module.exports.delete = (req,res,next) => {
    Payments.findByIdAndRemove(req.params.id) 
    .then(() => {
        res.status(204).json()
    })
    .catch(error => next (error));
}   
