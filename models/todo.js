const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    maxlength: [20, "title is too long"],
    required: [true, "please enter the todo"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

mongoose.connection.once("open", () => {
  Todo.collection.createIndex({ user: 1, title: 1 }, { unique: true });
});

module.exports = Todo;
