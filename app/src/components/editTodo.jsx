import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Edit = () => {
  const [msg, setmsg] = useState("");
  const [clr, setclr] = useState("");
  const navigate = useNavigate();

  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:1212/api/user/todos",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const tokenPresent = localStorage.getItem("token");
      if (!tokenPresent) {
        navigate("/login");
      } else {
        const axiosInstance = axios.create({
          baseURL: "http://localhost:1212/api/user/todos",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenPresent}`,
          },
        });
        const res = await axiosInstance.get(
          `http://localhost:1212/api/user/todos/todo/${id}`
        );

        const gotTodo = res.data.todo
        setTodo(gotTodo);
        setLoading(false);
      }
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const title = e.target.task.value;
      const completed = e.target.completed.checked;
      if (!title) {
        setmsg("please enter the task");
        setclr("crimson");
      }
      const editedTodo = await axiosInstance.patch(
        `http://localhost:1212/api/user/todos/todo/${id}`,
        { title: title, completed: completed }
      );
      navigate("/todos");
    } catch (error) {
      console.log(error);
    }
  }


    return (
      <div className='flex flex-col items-center  px-6  mx-auto  bg-gray-900 h-[100vh] w-full  '>
        {loading?<h1 className="text-white text-xl mt-20">Loading...</h1>:<div className='w-11/12 max-w-[500px] rounded-lg shadow border my-20   bg-gray-800   border-gray-700 px-8  py-10'>
          <h2 className='text-2xl font-semibold text-white text-center  pb-8'>
            Edit Your Todo
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
                {todo._id}
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
        </div>}
        
      </div>
    );
  
};

export default Edit;
