const express = require('express');
const { add, index, view, deleteData, deleteMany } = require('./meeting');


const router = express.Router();

// Routes for meeting management
router.post('/add', add);
router.post('/:id', add);
router.get('/:createBy', index);
router.get('/list', index);
router.get('/view/:id', view);
router.put('/delete/:id', deleteData);
router.put('/deleteMany/:ids', deleteMany);
module.exports = router;

module.exports = router