import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router";
import axios from "axios";
// import { useState, useEffect } from "react";


const Task = ({ todos }) => {
  const navigate = useNavigate();
  const axiosInstance = axios.create({
            baseURL: "http://localhost:1212/api/user/todos",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

  const handleEdit = (todo) => {
    console.log(todo._id);
    navigate(`/editTodo/${todo._id}`);
  };

  const handleDelete = async (e, todo) => {
    try {
      const article = e.currentTarget.parentElement.parentElement;
      article.style.display = "none";
      await axiosInstance.delete(
        `http://localhost:1212/api/user/todos/todo/${todo._id}`
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full flex flex-col items-center'>
      {todos &&
        todos.map((todo) => {
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
