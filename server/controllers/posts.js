const StatusCodes = require("http-status-codes");
const Post = require("../models/posts");
const { UnAuthorizedAccess, BadRequest, NotFoundError } = require("../errors");

const createPosts = async (req, res) => {
  const { username: author } = req.user;
  const { title, content } = req.body;
  if (!author) {
    throw new UnAuthorizedAccess("unauthorized access");
  }

  if (!title || !content) {
    throw new BadRequest("title and content cannot be empty");
  }

  const post = await Post.create({ ...req.body, author });
  res.status(StatusCodes.OK).json({
    success: true,
    post,
  });
};

const getPosts = async (req, res) => {
  const posts = await Post.find({});

  res.status(StatusCodes.OK).json({
    success: true,
    posts,
  });
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { title, content } = req.body;

  const post = await Post.findOneAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    throw new NotFoundError(`no post with id: ${postId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    post,
  });
};

const getPostById = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new NotFoundError(`no post with id: ${postId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    post,
  });
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.deleteOne({ _id: postId });
  if (!post) {
    throw new NotFoundError(`no post with id: ${postId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    post,
  });
};

module.exports = { createPosts, getPosts, updatePost, getPostById, deletePost };
