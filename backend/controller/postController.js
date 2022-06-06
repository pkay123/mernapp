const asyncHandler = require("express-async-handler");
const { remove } = require("../models/postModel");
const Post = require("../models/postModel");

//desc GET POSTS
//@route GET/api/posts
//@access Private

const getPost = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id });
  res.status(200).json(posts);
});

//desc CREATEPOSTS
//@route POST/api/posts
//@access Private

const createPost = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please Add some text");
  }

  const post = await Post.create({
    text: req.body.text,
    desc: req.body.desc,
    pic: req.body.pic,
    user: req.user.id,
  });

  res.status(200).json(post);
});

//desc UPDATE POSTS
//@route PUT/api/posts
//@access Private

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // check for user

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged in user matches the post user

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

//desc DELETE POSTS
//@route DELETE/api/posts
//@access Private

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // check for user

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged in user matches the post user

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost,
};
