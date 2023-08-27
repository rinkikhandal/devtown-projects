const { NotFound } = require("../errors");
const Todo = require("../models/todo");
const User = require("../models/user");
const statusCode = require("http-status-codes");

const getAllTodos = async (req, res) => {
  const { username, userId } = req.user;
  const todos = await Todo.find({ user: userId });
  res.status(statusCode.OK).json({ success: true, todos });
};

const addTodo = async (req, res) => {
  const { title } = req.body;
  const { userId } = req.user;
  const todo = await Todo.create({ title, user: userId });
  res.status(statusCode.OK).json({ todo });
};
const editTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: req.user.userId },
    { title, completed },
    { new: true, runValidators: true }
  );

  if (!todo) {
    throw new NotFound(`no to do with id ${id}`);
  }
  res.status(statusCode.OK).json({ todo });
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.userId });
  if (!todo) {
    throw new NotFound(`no to do with id ${id}`);
  }
  res.status(statusCode.OK).json({ success: true });
};

module.exports = {
  getAllTodos,
  addTodo,
  editTodo,
  deleteTodo,
};
