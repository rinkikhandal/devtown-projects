import { useNavigate,useLocation } from 'react-router'
import { useState} from 'react'


const Login = () => {
    const [msg, setmsg] = useState("")
  const [clr, setclr] = useState("")
  const navigate = useNavigate()
  
  const { state } = useLocation()
  
  if (!state) {
  navigate("/")
}
    const handleSubmit=(e)=>{
      e.preventDefault()
      const name =e.target.name.value
      const password = e.target.password.value
      
      if (state.password !== password || state.name !== name) {
        setmsg("incorrect username and password")
        setclr("red")
      }
      else {
        navigate("/todos")
        
      }

      setTimeout(() => {
      setclr('')
      setmsg('')
    },1000)
      
    }
  return (
    <section className=" bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800   border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Login to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium  text-white">Your username</ label>
                <input type="text" name="name" id="name" className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500  focus:border-blue-500" placeholder="John Doe" required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</  label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="   border  sm:text-sm rounded-lg focus:ring-primary-600   focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  text-white focus:ring-blue-500 focus:border-blue-500" required="" />
              </div>

              <button type="submit" className="w-full text-white   focus:ring-4   focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  bg-blue-600 hover:bg-blue-700 focus:ring-primary-800 ">Login to account</button>

            </form>
              <div className="msg text-white" style={{ color: clr }}>{msg}</div>

          </div>
        </div>
      </div>
    </section>
  )
}


export default Login