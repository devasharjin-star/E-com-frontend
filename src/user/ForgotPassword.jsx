import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { passwordForgot, removeErrors, removeSuccess } from '../features/user/userSlice'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [email,setEmail]=useState("")
    const {loading,success,error}=useSelector((state)=>state.user)
    const dispatch=useDispatch()

    const handleSubmit=(e)=>{
        e.preventDefault()

        dispatch(passwordForgot({email}))
        setEmail("")
    }

    useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }
    if (success) {
      dispatch(removeSuccess());
    }
  }, [dispatch, error, success]);


  return (
    <div className="min-h-screen  bg-gray-50">
      <Navbar />
      <PageTitle title="Forgot Password" />

      <div className="flex items-center justify-center px-4 py-12 mt-28">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
          
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your email to receive a reset link
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder="Enter your email"
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <button
              className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              type='submit'
            >
              Send Reset Link
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword