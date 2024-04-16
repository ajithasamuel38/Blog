const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');


const router = express.Router();


router.get('/admin/appointment/userData', adminController.getAll);

router.post('/admin/appointment/userData', adminController.create);

router.post('/admin/appointment/userData/:postId/comments', adminController.addComment);

router.get('/admin/appointment/userData/:postId/comments', adminController.getCommentsForBlog);

router.delete('/admin/appointment/userData/:postId/comments/:commentId', adminController.delete);

module.exports = router;