const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  addTodo,
  editTodo,
  deleteTodo,
} = require("../controllers/todos");

router.route("/").get(getAllTodos);
router.route("/todo").post(addTodo);
router.route("/todo/:id").patch(editTodo).delete(deleteTodo);

module.exports = router;
