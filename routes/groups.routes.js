const express = require('express');
const router = express.Router();
const group = require('../controllers/groups.controller');


router.post('/', group.create);
router.get('/', group.list);
router.get('/:id', group.select);
router.get('/:id', group.update);
router.delete('/:id', group.delete);

module.exports = router;