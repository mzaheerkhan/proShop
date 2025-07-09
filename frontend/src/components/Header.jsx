import { FaShoppingCart, FaUser } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import {useLogoutMutation} from '../redux/slices/usersApiSlice'
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart);
  const {userInfo} = useSelector((state)=>state.auth)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);

 const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    
  try {
    await logoutApiCall().unwrap();
    dispatch(logout());
    navigate('/login');
    toast.success("Logged out successfully.")
    
  } catch (err) {
    console.error(err);
  }
};
  return (
  
    <header className="bg-gray-800 text-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="logo" className="h-8" />
          <Link to="/" className="text-xl font-bold text-white">
            ProShop
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden cursor-pointer btn btn-ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link to="/cart" className="flex items-center gap-1 hover:text-green-400">
            <FaShoppingCart /> Cart
            {cartItems.length > 0 && (
              <span className="ml-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          {/* <Link to="/login" className="flex items-center gap-1 hover:text-green-400">
            <FaUser /> Sign In
          </Link> */}
          {userInfo ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost capitalize">
                {userInfo.name}  ⬇️
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile" className='text-gray-600 font-medium text-lg'>Profile</Link>
                </li>
                <hr />
                <li>
                  <button onClick={logoutHandler} className='text-gray-600 font-medium text-lg'>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-ghost  flex items-center gap-2 capitalize"
            >
              <FaUser /> Sign In
            </Link>
          )}

        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-700 text-white px-4 pb-3 divide-y-2 divide-gray-600">
          <Link
            to="/cart"
            className="flex py-2  items-center justify-center gap-2 hover:text-green-400"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaShoppingCart /> Cart
            {cartItems.length > 0 && (
              <span className="ml-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            to="/login"
            className="flex py-2  items-center justify-center gap-2 hover:text-green-400"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaUser /> Sign In
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
