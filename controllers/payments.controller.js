const createError = require('http-errors');

const Payment = require ('../models/payment.model');
const User = require ('../models/user.model');

module.exports.create = (req,res,next) => {
  const payment = new Payment(req.body);
  payment.group = req.params.groupId;
  
  if (req.files) {
      payment.image = [];
      for (const file of req.files) {
        payment.image.push(`${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
      }
    }
  
  User.findById({_id: payment.payer})
  .then(user => {
      if(!user){
          throw createError(404,'User not found')
      }else{
        payment.save()
        .then(payment => {
          console.log('NUEVO PAYMENT', payment);
            return res.status(201).json(payment)
        } )
        .catch(error => next(error));
      }})
      .catch(error => next(error));
    }


module.exports.list = (req,res,next) => {
    Payment.find({ group: req.params.groupId })
        .then(payments => res.json(payments))
        .catch(error => next(error));
}

module.exports.select = (req,res,next) => {
    Payment.findById({_id: req.params.id, group: req.params.groupId} )
    .then(payment => {
        if(!payment){
            throw createError(404,'Payment not found')
        }else{
            res.json(payment);
        }})
        .catch(error => next(error));
}

module.exports.update = (req, res, next) => {
    const id = req.params.id;
  
    Payment.findById(id)
      .then(payment => {
        if (payment) {
          Object.assign(payment, {
            group: req.params.groupId,
            subject: req.body.subject,
            amount: req.body.amount,
            date: req.body.date,
            image: req.params.image,
            enum: req.params.enum
          });
  
          payment.save()
            .then(() => {
              res.json(payment);
            })
            .catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                next(createError(400, error.errors));
              } else {
                next(error);
              }
            })
        } else {
          next(createError(404, `Payment not found`));
        }
      })
      .catch(error => next(error));
  }

module.exports.delete = (req,res,next) => {
    Payment.findByIdAndRemove({admin: req.user.id, _id: req.params.id}) 
    .then(() => {
        res.status(204).json()
    })
    .catch(error => next (error));
}   
