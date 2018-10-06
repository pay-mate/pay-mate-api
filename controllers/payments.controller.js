const Payment = require ('../models/payment.model');

module.exports.create = (req,res,next)=> {
    const payment = new Payment (req.body);
    // payment.admin = req.user.id;
    payment.save()
    .then(payment => res.status(201).json(payment))
    .catch(error => next (error));
}

module.exports.list = (req,res,next) => {
    Payment.find()
    .then(payments => res.json(payments))
    .catch(error => next(error));

}

module.exports.select = (req,res,next) => {
    Payment.findById(req.params.id)
    .then(payment => {
        if(!payment){
            throw createError(404,'Payment not found')
        }else{
            res.json(payment);
        }})
        .catch(error => next(error));
}

module.exports.update = (req,res,next) => {
    Payment.findById(req.params.id)
    .then(payment =>{
        if (!payment){
            throw createError(404, 'Payment not found')
        }else{
            payment.save()
            .then(payment => res.status(200).json(payment))
            .catch(error => next (error));
        }
    })
    .catch(error => next (error));
}

module.exports.delete = (req,res,next) => {
    Payment.findByIdAndRemove(req.params.id) 
    .then(() => {
        res.status(204).json()
    })
    .catch(error => next (error));
}   
