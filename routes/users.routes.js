const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');


router.post('/', user.create);
router.get('/', user.list);
router.get('/:id', user.select);
router.get('/:id', user.update);
router.delete('/:id', user.delete);

module.exports = router;