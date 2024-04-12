const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');


const router = express.Router();


router.get('/admin/appointment/userData', adminController.getAll);

router.post('/admin/appointment/userData', adminController.create);

router.post('/admin/appointment/userData/:userId', adminController.addComment);

router.delete('/admin/appointment/userData/:userId', adminController.delete);

module.exports = router;