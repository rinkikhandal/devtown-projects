import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios'
import Task from "./task";

const Todo = () => {
  const navigate = useNavigate();
  const axiosInstance = axios.create({
  baseURL: 'http://localhost:1212/api/user/todos',
  headers: {
    'Content-Type': "application/json",
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }

}) 
  // console.log('Request Headers:', axiosInstance.defaults.headers);
  // console.log('Token:', JSON.parse(localStorage.getItem('token')));


  const [todos, setTodos] = useState([]);
  const [msg, setmsg] = useState("");
  const [clr, setclr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

          const dataTodos = await axiosInstance.get("http://localhost:1212/api/user/todos");
          setTodos(dataTodos.data.todos);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const title = e.target.task.value;
      if (!title) {
        setclr("crimson");
        setmsg("please enter the task");
      }
      const completed = false;
      
      const dataTodo = await axiosInstance.post(
        "http://localhost:1212/api/user/todos/todo",
        { title: title, completed: completed }
      );

      setTodos((prevTodos) => [...prevTodos, dataTodo.data.todo]);



      e.target.task.value = "";
      setTimeout(() => {
        setclr("");
        setmsg("");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div>

      <button
        className='absolute right-10 top-5 text-white bg-blue-600 hover:bg-blue-700 border-none tracking-wide px-3 py-2 rounded text-lg'
        onClick={handleLogout}
      >
        Log Out
      </button>
      <div className='flex flex-col items-center  px-6  mx-auto  bg-gray-900 min-h-[100vh] w-full pb-10 '>
        <div className='w-11/12 max-w-[500px] rounded-lg shadow border my-20   bg-gray-800   border-gray-700 px-8  py-10'>
          <h2 className='text-2xl font-semibold text-white text-center  pb-8'>
            Add Your Todos{" "}
          </h2>

          <form className='flex' onSubmit={handleSubmit}>
            <input
              className=' border  sm:text-sm rounded-s-lg  block w-full p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none tracking-wider'
              placeholder='your task'
              name='task'
            />
            <button
              type='submit'
              className='text-white font-medium rounded-e-lg text-sm px-5 py-2.5 text-center  bg-blue-600 hover:bg-blue-700 focus:ring-primary-800 '
            >
              Submit
            </button>
          </form>
          <div className='msg' style={{ color: clr }}>
            {msg}
          </div>
        </div>
        {loading?<p className="text-white">Loading...</p>:<Task todos={todos} />}

        {/* single item  */}
        
        {/* end of single item  */}
      </div>
    </div>
  );
};

export default Todo;
