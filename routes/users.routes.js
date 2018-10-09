const express = require('express');
const router = express.Router({ mergeParams: true });
const user = require('../controllers/users.controller');
const secure = require('../middleware/secure.middleware');


router.post('/', secure.isAuthenticated, user.create);
router.get('/', secure.isAuthenticated, user.list);
router.get('/:id', secure.isAuthenticated, user.select);
router.post('/:id', secure.isAuthenticated, user.update);
router.delete('/:id', secure.isAuthenticated, user.delete);

module.exports = router;