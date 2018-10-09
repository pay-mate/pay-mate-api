const express = require('express');
const router = express.Router({ mergeParams: true });
const group = require('../controllers/groups.controller');
const secure = require('../middleware/secure.middleware');


router.post('/',secure.isAuthenticated, group.create);
router.get('/', secure.isAuthenticated, group.list);
router.get('/:id', secure.isAuthenticated, group.select);
router.post('/:id', secure.isAuthenticated, group.update);
router.delete('/:id', secure.isAuthenticated, group.delete);
router.get('/:id/result', secure.isAuthenticated, group.result);

module.exports = router;