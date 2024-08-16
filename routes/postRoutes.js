const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const postController = require('../controllers/postController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

//Multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', postController.getAllPosts);

router.get('/new', isAuthenticated, postController.getNewPostForm);
router.post('/', isAuthenticated, upload.single('image'), postController.createPost);

router.get('/:id/edit', isAuthenticated, postController.getEditPostForm);
router.post('/:id', isAuthenticated, upload.single('image'), postController.updatePost);

router.post('/:id/delete', isAuthenticated, postController.deletePost);

module.exports = router;