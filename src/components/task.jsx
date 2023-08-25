import {useNavigate,useLocation} from 'react-router'
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { BiSolidEdit } from "react-icons/bi"
// import {useState} from 'react'

const Task = ({ todos }) => {
  const {state} = useLocation()
  if (state) {
    todos= state.todos
  }
  const navigate = useNavigate()

  const handleEdit = (e, todo) => {
    navigate("/editTodo",{state:{todo:todo,todos:todos}})
  }

  const handleDelete = (e, todo) => {
    const article = e.target.parentElement.parentElement.parentElement
    article.style.display="none"
    todos = todos.filter((t)=>
      t.id !== todo.id)
  }
  
  return (
    <div className='w-full flex flex-col items-center'>
      {todos.map(todo => {
        
        return (<article className="text-white flex justify-between  items-center  rounded-lg shadow border  bg-gray-800 border-gray-700 w-11/12 max-w-[500px] py-2 px-10 capitalize box-border mb-4 h-full">
          <p style={todo.completed ? { textDecoration: "line-through" } : {textDecoration:"none"}}>{todo.title}</p> 
          <div className='flex'>
        <BiSolidEdit className='mr-2 text-green-700' onClick={(e) => {
          handleEdit(e,todo)
        } } />
        <RiDeleteBin6Fill className='text-red-700' onClick={(e) => {
          handleDelete(e,todo)
            } }/>
          </div>
        </article>)
      })}
    </div>
  )
    
  

}

export default Task



