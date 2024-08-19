const { Post } = require('../models');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('posts/index', { posts });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get a specific post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.render('posts/view', { post });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content });
    res.redirect(`/posts/${post.id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).send('Post not found');
    const { title, content } = req.body;
    await post.update({ title, content });
    res.redirect(`/posts/${post.id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).send('Post not found');
    await post.destroy();
    res.redirect('/posts');
  } catch (error) {
    res.status(500).send(error.message);
  }
};