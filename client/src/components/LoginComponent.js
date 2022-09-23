import React from 'react'
import authService from '../services/auth.service';
import { useNavigate } from "react-router-dom";



export const LoginComponent = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault()
    let email = event.target[0].value
    let password = event.target[1].value
    authService.login(email,password).then(
      (result)=>{
        navigate("/home")
        console.log(result)
      }
    ).catch((error)=>{
      alert(error.response.data.error)
    })
  }
  return (
      <div className="grid grid-cols-1 sm:grid-cols-1 h-screen w-full bg-loginImg  bg-no-repeat bg-cover bg-center bg-fixed">

        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="max-w-[500px] w-full mx-auto p-20 rounded-xl">
            <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-red-800">LOG IN</h2>
            <div className="flex flex-col text-gray-300 py-2">
              <label>Email</label>
              <input name="email" className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 bg-gradient-to-r from-gray-800 to-red-800 focus:outline-none" type="text"></input>
            </div>
            <div className="flex flex-col text-gray-300 py-2">
              <label>Password</label>
              <input name="password" className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 bg-gradient-to-r from-gray-800 to-red-800 focus:outline-none" type="password"></input>
            </div>
            <button type="submit" className="w-full my-5 py-2 bg-teal-700 rounded-lg shadow-lg  bg-gradient-to-r from-gray-800 to-red-800 shadow-red font-bold text-yellow-50">Log In</button>
            <a href="/register" className="text-white underline hover:text-red-900">Register</a>
          </form>
        </div>
      </div>
  )
}
export default LoginComponent;
