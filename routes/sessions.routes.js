const express = require('express');
const router = express.Router({ mergeParams: true });
const session = require('../controllers/sessions.controller');

router.post('/', session.create);
router.delete('/', session.delete);

module.exports = router;
    