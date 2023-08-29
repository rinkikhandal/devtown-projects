import { useEffect } from "react"
import { useNavigate } from "react-router"


const Logout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.removeItem('token')
    navigate('/login')
},[])
  return (
    <h1>loging out</h1>
  )
}

export default Logout