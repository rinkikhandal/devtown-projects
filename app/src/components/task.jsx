import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const Task = ({ todos}) => {
  const navigate = useNavigate();
  const [updatedTodos, setUpdatedTodos] = useState(todos);

  useEffect(() => {
    setUpdatedTodos(todos); // Update updatedTodos whenever todos prop changes
  }, [todos]);

  const handleEdit = (todo) => {
    navigate(`/editTodo/${todo.id}`, { state: { todos: updatedTodos } });
  };

  const handleDelete = (e, todo) => {
    const article = e.currentTarget.parentElement.parentElement;
    article.style.display = "none";
    todos = todos.filter((t) => t.id !== todo.id);
    setUpdatedTodos(todos);
    
  };

  return (
    <div className='w-full flex flex-col items-center'>
      {updatedTodos &&
        updatedTodos.map((todo) => {
          return (
            <article className='text-white flex justify-between  items-center  rounded-lg shadow border  bg-gray-800 border-gray-700 w-11/12 max-w-[500px] py-2 px-10 capitalize box-border mb-4 h-full'>
              <p
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </p>
              <div className='flex'>
                <BiSolidEdit
                  className='mr-2 text-green-700'
                  onClick={() => {
                    handleEdit(todo);
                  }}
                />
                <RiDeleteBin6Fill
                  className='text-red-700'
                  onClick={(e) => {
                    handleDelete(e, todo);
                  }}
                />
              </div>
            </article>
          );
        })}
    </div>
  );
};

export default Task;
