const express = require('express');
const router = express.Router();
const payment = require('../controllers/payments.controller');


router.post('/', payment.create);
router.get('/', payment.list);
router.get('/:id', payment.select);
router.get('/:id', payment.update);
router.delete('/:id', payment.delete);

module.exports = router;