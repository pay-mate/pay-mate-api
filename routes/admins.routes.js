const express = require('express');
const router = express.Router({ mergeParams: true });
const admins = require('../controllers/admins.controller');
const admin = require('../middleware/admin.middleware');
const secure = require('../middleware/secure.middleware');

router.post('/', admins.create);
router.get('/',secure.isAuthenticated, admins.list);
// router.post('/:id',secure.isAuthenticated, admins.update);
router.delete('/:id', admin.isMe() ,admins.delete);

module.exports = router;
