const Payment = require ('../models/payment.model');
const createError = require('http-errors');


module.exports.create = (req,res,next)=> {
    const payment = new Payment (req.body);
    // payment.group = req.params.groupId;

    if (req.files) {
        payment.image = [];
        for (const file of req.files) {
          payment.image.push(`${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
        }
      }

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
    Payment.findById({admin: req.user.id, _id: req.params.id} )
    .then(payment => {
        if(!payment){
            throw createError(404,'Payment not found')
        }else{
            res.json(payment);
        }})
        .catch(error => next(error));
}

module.exports.update = (req,res,next) => {
    Payment.findById({admin: req.user.id, _id: req.params.id})
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
    Payment.findByIdAndRemove({admin: req.user.id, _id: req.params.id}) 
    .then(() => {
        res.status(204).json()
    })
    .catch(error => next (error));
}   
