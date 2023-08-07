const express = require("express");

const {
  createPosts,
  getPosts,
  updatePost,
  getPostById,
  deletePost,
} = require("../controllers/posts");

const router = express.Router();

router.route("/").post(createPosts).get(getPosts);
router.route("/:id").patch(updatePost).get(getPostById).delete(deletePost);

module.exports = router;
