import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Contacts from "./pages/Contacts"
import ProductDetails from "./pages/ProductDetails"
import About from "./pages/About"
import Products from "./pages/Products"
import Register from "./user/Register"
import Login from "./user/Login"
import Profile from "./user/Profile"
import UpdateProfile from "./user/UpdateProfile"
import ChangePassword from "./user/ChangePassword"
import ForgotPassword from "./user/forgotPassword"


const App = () => {
  return (
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/contacts" element={<Contacts/>}/>
    <Route path="/about-us" element={<About/>}/>
    <Route path="/product/:id" element={<ProductDetails/>}/>
    <Route path="/products" element={<Products/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/profile/update" element={<UpdateProfile/>}/>
    <Route path="/profile/password/update" element={<ChangePassword/>}/>
    <Route path="/password/forgot" element={<ForgotPassword/>}/>
  </Routes>
  )
}

export default App