import {useNavigate} from 'react-router'
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { BiSolidEdit } from "react-icons/bi"
// import {useState} from 'react'

const Task = ({ todos }) => {
  
  const navigate = useNavigate()

  const handleEdit = (e, todo) => {
    console.log( e.currentTarget.parentElement);
  
    navigate("/editTodo",{todo:{...todo}})
  }

  const handleDelete = (e,todo) => {
   todos = todos.filter((todo)=>{
      return todos.filter((t)=>t.id !== todo.id)
    })
  }
  
  return (
    <div className='w-full flex flex-col items-center'>
      {todos.map(todo => {
        return (<article className="text-white flex justify-between   rounded-lg shadow border  bg-gray-800 border-gray-700 w-11/12 max-w-[500px] py-2 px-10 capitalize box-border mb-4">
          {todo.completed?<p style={{textDecorationStyle:"line-through"}}>{todo.title}</p>:<p>{todo.title}</p>}
          <div className='flex '>
        <BiSolidEdit className='mr-2 text-green-700' onClick={() => {
          handleEdit(todo)
        } } />
        <RiDeleteBin6Fill className='text-red-700' onClick={() => {
          handleDelete(todo)
            } }/>
          </div>
        </article>)
      })}
    </div>
  )
    
  

}

export default Task



