import {useNavigate} from 'react-router'
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { BiSolidEdit } from "react-icons/bi"
import {useState} from 'react'

const Task = ({ todo }) => {
  const [todos, setTodos] = useState([])

    setTodos([...todos, todo]);
  
  const navigate = useNavigate()

  const handleEdit = (todo) => {
    navigate("/editTodo",{todo:{...todo}})
  }

  const handleDelete = (todo) => {
    setTodos((todos) => {
      return todos.filter((t)=>t.id !== todo.id)
    })
  }
  
  return (
    <div>
      {todos.map(todo => {
        return (<article className="text-white flex justify-between items-center">
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



