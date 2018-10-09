const express = require('express');
const router = express.Router({ mergeParams: true });
const payment = require('../controllers/payments.controller');
const secure = require('../middleware/secure.middleware');
const uploader = require('../config/multer.config');

router.post('/', secure.isAuthenticated, uploader.array('image'), payment.create);
router.get('/', secure.isAuthenticated, payment.list);
router.get('/:id', secure.isAuthenticated, payment.select);
router.post('/:id', secure.isAuthenticated, payment.update); // Hay que corregir, un update necesita un POST
router.delete('/:id', secure.isAuthenticated, payment.delete);

module.exports = router;