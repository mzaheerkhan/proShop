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
  const totalQty = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);

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
  
    <header className="bg-gray-800  text-white">
      <div className="navbar px-0 py-2 max-w-7xl mx-auto">
        {/* Logo & Brand */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <img src={logo} alt="ProShop" className="w-8 h-8" />
            ProShop
          </Link>
        </div>

        {/* Search */}
        {/* <div className="hidden lg:flex navbar-center">
          <SearchBox />
        </div> */}

        {/* Nav Right */}
        <div className="navbar-end gap-4">
          <Link to="/cart" className="btn btn-ghost  flex items-center gap-1">
            <FaShoppingCart />
            Cart
            {totalQty > 0 && (
              <div className="badge badge-success badge-sm ml-1 ">
                {totalQty}
              </div>
            )}
          </Link>

          {userInfo ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost ">
                {userInfo.name}
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 text-black rounded-box w-52 z-50">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-ghost flex items-center gap-1">
              <FaUser />
              Sign In
            </Link>
          )}

          {/* Admin Links */}
          {userInfo?.isAdmin && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost ">
                Admin
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 text-black rounded-box w-52 z-50">
                <li>
                  <Link to="/admin/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/admin/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/admin/userlist">Users</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
