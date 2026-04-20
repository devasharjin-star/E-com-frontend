import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  {useSelector, useDispatch } from 'react-redux'
import toast from "react-hot-toast";
import { login, removeErrors, removeSuccess } from "../features/user/userSlice";

const Login = () => {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {error,loading,success}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(login({email,password}))
  }

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(removeErrors())
    }
  },[dispatch,error])

  useEffect(()=>{
    if(success){
      toast.success(success)
      dispatch(removeSuccess())
      navigate('/')
    }
  },[dispatch,success,error])

  return (
  <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
    
    <div className="w-full max-w-md bg-white border border-blue-100 rounded-lg p-6">
      
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-blue-600">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Please Login to continue...
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          placeholder="Email"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          placeholder="Password"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 active:scale-[0.98] transition"
        >
          Sign In
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-gray-500 mt-5 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 font-medium hover:underline">
          {loading?"Please wait...":"Sign Up"}
        </Link>
      </p>
      <p className="text-sm text-gray-500 mt-3 text-center">
        Forgot Password ?
        <Link to="/password/forgot"  className="text-blue-600 font-medium hover:underline">
          click here
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login