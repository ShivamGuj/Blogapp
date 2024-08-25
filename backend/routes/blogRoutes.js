const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware  = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/getblogs', blogController.getBlogs);
router.post('/create-blog', blogController.createBlog);
router.get('/getblog/:id', blogController.getBlogById);
router.put('/update/:id', blogController.updateBlog);
router.delete('/delete/:id', blogController.deleteBlog);
router.post('/add-comment', authMiddleware, blogController.addComment);
router.get('/get-comments/:id', blogController.getComments);

module.exports = router;
