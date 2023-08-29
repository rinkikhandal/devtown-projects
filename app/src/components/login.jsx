import { useNavigate, useLocation } from "react-router";
import {Link} from 'react-router-dom'
import { useState,useEffect } from "react";
import axios from 'axios'

const Login = () => {
  const [msg, setmsg] = useState("");
  const [clr, setclr] = useState("");
  const navigate = useNavigate();


  useEffect(()=>{ const tokenPresent = localStorage.getItem('token')
  if (tokenPresent) {
    navigate('/todos')
  }},[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const data = await axios.post(" http://localhost:1212/api/user/login", { email, password });
      const parsedResponse = JSON.parse(data.request.response)
      localStorage.setItem('token', parsedResponse.token)
      // console.log(localStorage.getItem('token'));
      navigate('/todos')
      
    } catch (error) {
      const errMessage = error.response.data.msg 
      setclr('crimson')
      setmsg(errMessage)
      console.log(errMessage);
    }
  };

    setTimeout(() => {
    setclr('')
    setmsg('')
  },2000)

  return (
    <section className=' bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800   border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-white'>
              Login to your account
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium  text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className=' sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  placeholder='name@company.com'
                  required=''
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='   border  sm:text-sm rounded-lg focus:ring-primary-600   focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  text-white focus:ring-blue-500 focus:border-blue-500'
                  required=''
                />
              </div>

              <button
                type='submit'
                className='w-full text-white   focus:ring-4   focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  bg-blue-600 hover:bg-blue-700 focus:ring-primary-800 '
              >
                Login to account
              </button>
            </form>
          <p className="text-sm font-light text-gray-400">
              Don't have an account? <Link to="/" className="font-medium  hover:underline text-violet-500 ">Register here</Link>
            </p>
            <div className='msg text-white' style={{ color: clr }}>
              {msg}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
