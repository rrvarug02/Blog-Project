const router = require('express').Router();
const { Post } = require('../models');

// Route to get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    console.log(posts)
    res.render('posts/index', { posts });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router;