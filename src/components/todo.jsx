import {useLocation} from 'react-router'

import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import Task from "./task"

const Todo = () => {
  const { state } = useLocation()
  console.log(state);
  const [todos, setTodos] = useState(state?state.updatedTodos:[])

  const [msg, setmsg] = useState("")
  const [clr, setclr] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const title = e.target.task.value
    if (!title) {
      setclr("crimson")
      setmsg("please enter the task")
    }
    const completed = false
    const id = uuidv4()
    setTodos([...todos, { title: title, completed: completed, id: id }]);
    e.target.task.value = ""
    setTimeout(() => {
      setclr('')
      setmsg('')
    },1000)
      
  }

  return (
      <div className="flex flex-col items-center  px-6  mx-auto  bg-gray-900 h-[100vh] w-full  ">
      <div className="w-11/12 max-w-[500px] rounded-lg shadow border my-20   bg-gray-800   border-gray-700 px-8  py-10">
        <h2 className="text-2xl font-semibold text-white text-center  pb-8">Add Your Todos </h2>

        <form className="flex" onSubmit={handleSubmit}>
          <input
          className=" border  sm:text-sm rounded-s-lg  block w-full p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none tracking-wider"
            placeholder="your task"
            name="task"
          />
          <button type="submit" className="text-white font-medium rounded-e-lg text-sm px-5 py-2.5 text-center  bg-blue-600 hover:bg-blue-700 focus:ring-primary-800 ">Submit</button>
        </form>
        <div className="msg" style={{color:clr}}>{msg }</div>
      </div>

      
        {/* single item  */}
        {todos && <Task  todos={ todos} />}
        {/* end of single item  */}
    </div>
  )
}

export default Todo