import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Contacts from "./pages/Contacts"
import Products from "./pages/products"
import About from "./pages/About"

const App = () => {
  return (
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/contacts" element={<Contacts/>}/>
    <Route path="/about-us" element={<About/>}/>
    <Route path="/products" element={<Products/>}/>
  </Routes>
  )
}

export default App