const StatusCodes = require("http-status-codes");
const Post = require("../models/posts");
const { UnAuthorizedAccess, BadRequest, NotFoundError } = require("../errors");

const createPosts = async (req, res) => {
  req.body.postedBy = req.user.userId;
  const { title, content, postedBy } = req.body;

  if (!postedBy) {
    throw new UnAuthorizedAccess("unauthorized access");
  }

  if (!title || !content) {
    throw new BadRequest("title and content cannot be empty");
  }

  const post = await Post.create({ ...req.body, postedBy });
  res.status(StatusCodes.OK).json({
    success: true,
    post,
  });
};

const getPosts = async (req, res) => {
  const { userId } = req.user;
  const posts = await Post.find({ postedBy: userId }).sort("createdAt");

  res.status(StatusCodes.OK).json({
    success: true,
    posts,
  });
};

const updatePost = async (req, res) => {
  const {
    params: { id: postId },
    user: { userId },
  } = req;

  const post = await Post.findOneAndUpdate(
    { _id: postId, postedBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!post) {
    throw new NotFoundError(`no post with id: ${postId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    post,
  });
};

const getPostById = async (req, res) => {
  const {
    params: { id: postId },
    user: { userId },
  } = req;

  const post = await Post.findOne({ _id: postId, postedBy: userId });

  if (!post) {
    throw new NotFoundError(`no post with id: ${postId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    post,
  });
};

const deletePost = async (req, res) => {
  const {
    params: { id: postId },
    user: { userId },
  } = req;

  const post = await Post.deleteOne({ _id: postId, postedBy: userId });

  if (!post) {
    throw new NotFoundError(`no post with id: ${postId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    post,
  });
};

module.exports = { createPosts, getPosts, updatePost, getPostById, deletePost };
