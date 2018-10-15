const Admin = require('../models/admin.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
  Admin.findOne({
      email: req.body.email
    })
    .then(admin => {
      if (admin) {
        throw createError(409, `Admin with email ${req.body.email} already exists`);
      } else {
        admin = new Admin(req.body);
        admin.save()
          .then(admin => res.status(201).json(admin))
          .catch(error => {
            next(error)
          });
      }
    })
    .catch(error => next(error));
}

module.exports.list = (req, res, next) => {
  const id = req.user.id;
  Admin.findById(id)
    .then(admin => res.json(admin))
    .catch(error => next(error));
}

// module.exports.update = (req, res, next) => {
//   const id = req.user.id;

//   Admin.findById(id)
//     .then(admin => {
//       if (admin) {
//         Object.assign(admin, {
//           email: req.body.email,
//           password: req.body.password
//         });

//         admin.save()
//           .then(() => {
//             res.json(admin);
//           })
//           .catch(error => {
//             if (error instanceof mongoose.Error.ValidationError) {
//               next(createError(400, error.errors));
//             } else {
//               next(error);
//             }
//           })
//       } else {
//         next(createError(404, `Admin not found`));
//       }
//     })
//     .catch(error => next(error));
// }

module.exports.delete = (req,res,next) => {
  Admin.findByIdAndRemove(req.params.id) 
  .then(() => {
      res.status(204).json()
  })
  .catch(error => next (error));
}   