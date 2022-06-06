const express = require("express");
const router = express.Router();
const {
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controller/postController");

const { protect } = require("../middleware/authMiddleware");

//get post and create cleanup
router.route("/").get(protect, getPost).post(protect, createPost);

//update post and delete cleanup
router.route("/:id").put(protect, updatePost).delete(protect, deletePost);

module.exports = router;
