const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');

router.post('/', users.create);
router.get('/', users.list);
router.delete('/:id', users.delete);

module.exports = router;
