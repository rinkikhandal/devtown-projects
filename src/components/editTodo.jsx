import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

const Edit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [msg, setmsg] = useState("");
  const [clr, setclr] = useState("");
  let todos = state.todos;
  const id = window.location.pathname.split("/")[2]

  const todo = todos.find((todo) => todo.id === id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.task.value;
    const completed = e.target.completed.checked;
    if (!title) {
      setmsg("please enter the task");
      setclr("crimson");
    }
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
        todo.completed = completed;
      }
      return todo;
    });
    navigate("/todos", { state: { updatedTodos: todos } });
  };

  return (
    <div className='flex flex-col items-center  px-6  mx-auto  bg-gray-900 h-[100vh] w-full  '>
      <div className='w-11/12 max-w-[500px] rounded-lg shadow border my-20   bg-gray-800   border-gray-700 px-8  py-10'>
        <h2 className='text-2xl font-semibold text-white text-center  pb-8'>
          Edit Your Todo{" "}
        </h2>

        <form className='flex flex-col' onSubmit={handleSubmit}>
          <div className='flex items-center mb-3 justify-between'>
            <label
              htmlFor='todoId'
              className='text-white text-lg  tracking-wider'
            >
              TodoId
            </label>
            <p className='sm:text-sm rounded-s-lg  block w-8/12  p-2.5  placeholder-gray-400 text-white outline-none tracking-normal'>
              {todo.id}
            </p>
          </div>
          <div className='flex items-center mb-3  justify-between'>
            <label
              htmlFor='task'
              className='text-white text-lg  tracking-wider'
            >
              Todo
            </label>
            <input
              type='text'
              className=' border  sm:text-sm rounded-lg  block w-8/12 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none tracking-widest capitalize '
              name='task'
              defaultValue={todo.title}
              id='task'
            />
          </div>
          <div className='flex items-center mb-3'>
            <label
              htmlFor='completed '
              className='text-white text-lg  tracking-wider w-4/12'
            >
              Completed
            </label>
            <input
              type='checkbox'
              defaultChecked={todo.completed}
              name='completed'
              id='completed'
              className=' '
            />
          </div>
          <button
            type='submit'
            className='text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center  bg-blue-600 hover:bg-blue-700 focus:ring-primary-800'
          >
            Edit
          </button>
        </form>
        <div className='msg' style={{ color: clr }}>
          {msg}
        </div>
      </div>
    </div>
  );
};

export default Edit;
