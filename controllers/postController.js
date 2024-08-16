const { Post, User } = require('../models');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.render('posts/index', { posts, user: req.session.user });
  } catch (err) {
    res.status(500).send('Error fetching posts');
  }
};

exports.getNewPostForm = (req, res) => {
  res.render('posts/new', { user: req.session.user });
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    await Post.create({
      title,
      content,
      imageUrl,
      UserId: req.session.user.id
    });
    res.redirect('/posts');
  } catch (err) {
    res.status(500).send('Error creating post');
  }
};

exports.getEditPostForm = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.render('posts/edit', { post, user: req.session.user });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    res.status(500).send('Error fetching post');
  }
};

exports.updatePost = async (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      await post.update({
        title,
        content,
        imageUrl
      });
      res.redirect('/posts');
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    res.status(500).send('Error updating post');
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      await post.destroy();
      res.redirect('/posts');
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    res.status(500).send('Error deleting post');
  }
};