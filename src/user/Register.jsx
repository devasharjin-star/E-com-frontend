import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch,useSelector} from 'react-redux'
import {register,  removeErrors, removeSuccess } from '../features/user/userSlice'

const Register = () => {
  const [preview, setPreview] = useState("");
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { name, email, password } = user;
  const {loading,error,success}=useSelector((state)=>{return state.user})

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    

    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("password", password)
    myForm.set("email", email)
    myForm.set("avatar", avatar)

    dispatch(register(myForm))
    console.log({ ...user, avatar });
    
  };
  useEffect(()=>{
   if(error){
     toast.error(error),
    dispatch(removeErrors())
   }
  })
  useEffect(()=>{
    if(success){
      toast.success("Registered successfully 🚀");
    dispatch(removeSuccess())
    navigate('/login')
    }
  })

 return (
  <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
    
    <div className="w-full max-w-md bg-white border border-blue-100 rounded-lg p-6">
      
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-blue-600">
          Create account
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Get started with your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Full name"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />

        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-blue-200 overflow-hidden flex items-center justify-center text-xs text-blue-400">
            {preview ? (
              <img
                src={preview}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              "Img"
            )}
          </div>

          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="text-sm text-gray-600 file:rounded-4xl file:bg-blue-100 file:p-2 "
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 active:scale-[0.98] transition"
        >
          {loading ? "Please wait..." : "Create account"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-gray-500 mt-5 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  </div>
);
};

export default Register;