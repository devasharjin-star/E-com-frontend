import { Menu, Search, ShoppingBag, ShoppingCart, X } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../features/user/userSlice"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [profileDropDownOpen, setProfileDropDownOpen] = useState(false)
  const dispatch = useDispatch()

  const cartCount = 3
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery)}`)
    } else {
      navigate('/products')
    }
    setSearchQuery("")
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 text-blue-700 font-bold text-lg">
          <ShoppingBag size={24} />
          Shopping Hub
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/products" className="hover:text-blue-600 transition">Products</Link>
          <Link to="/contacts" className="hover:text-blue-600 transition">Contact</Link>
          <Link to="/about-us" className="hover:text-blue-600 transition">About</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <form
            onSubmit={handleSubmit}
            className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1.5"
          >
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              className="bg-transparent outline-none px-2 text-sm w-40"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <Search size={16} className="text-gray-500" />
            </button>
          </form>

          {/* CART */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </Link>

          {/* AUTH */}
          {!isAuthenticated ? (
            <div className="hidden md:flex gap-3 text-sm">
              <button
                onClick={() => navigate('/login')}
                className="hover:text-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="relative hidden md:block">

              {/* AVATAR */}
              <button onClick={() => setProfileDropDownOpen(!profileDropDownOpen)}>
                <img
                  className="h-9 w-9 rounded-full border-2 border-blue-500 object-cover"
                  src={user?.avatar?.url}
                  alt=""
                />
              </button>

              {/* DROPDOWN */}
              {profileDropDownOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-lg p-2">

                  {/* USER INFO */}
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <hr />
                  {/* MENU */}
                  <div className="mt-1 flex flex-col text-sm text-gray-700">
                    <Link
                      to="/profile"
                      className="px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/orders"
                      className="px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/settings"
                      className="px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      Settings
                    </Link>
                  </div>
                  <hr />
                  {/* LOGOUT */}
                  <div className="mt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm rounded-lg text-red-500 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm px-4 py-4 space-y-4">

          {/* LINKS */}
          <div className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
            <Link to="/contacts" onClick={() => setOpen(false)}>Contact</Link>
            <Link to="/about-us" onClick={() => setOpen(false)}>About</Link>
          </div>

          <div className="border-t pt-4"></div>

          {/* MOBILE PROFILE */}
          {!isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/login')}
                className="border py-2 rounded-lg"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-600 text-white py-2 rounded-lg"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">

              {/* USER */}
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar?.url}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div>
                  <p className="font-semibold text-sm">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              <div className="border"></div>

              {/* LINKS */}
              <div className="flex flex-col text-sm text-gray-700">
                <Link to="/profile" onClick={() => setOpen(false)} className="py-2">My Profile</Link>
                <Link to="/orders" onClick={() => setOpen(false)} className="py-2">My Orders</Link>
                <Link to="/settings" onClick={() => setOpen(false)} className="py-2">Settings</Link>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg text-sm"
              >
                Logout
              </button>

            </div>
          )}

        </div>
      )}
    </header>
  )
}

export default Navbar