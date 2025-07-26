import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useProfileMutation } from "../redux/slices/usersApiSlice"
import { useGetMyOrdersQuery } from '../redux/slices/orderApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import Tabs from '../components/Tabs';


const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState("Profile")
  const tabs = ["Profile", "Orders"]

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className='space-y-4'>
        <Tabs
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          tabs={tabs}
        />
      </div>

      {
        activeTab === "Profile" && (
          <FormContainer>
            <div className=" space-y-4 mt-3">
              <h2 className="text-3xl font-bold mb-6 text-center">User Profile</h2>
              <form onSubmit={submitHandler} className="space-y-4 ">
                <div className="form-control ">
                  <label htmlFor="name" className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="confirmPassword">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  {loadingUpdateProfile ? 'Updating...' : 'Update'}
                </button>
              </form>
            </div>
          </FormContainer>

        )
      }
      {activeTab === "Orders" && (
        <>
          <div className="flex flex-col mt-3 ">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center ">My Orders</h2>

            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.error}
              </Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <FaTimes className="text-red-500" />
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order?.deliveredAt?.substring(0, 10)
                          ) : (
                            <FaTimes className="text-red-500" />
                          )}
                        </td>
                        <td>
                          <Link to={`/order/${order._id}`}>
                            <button className="btn btn-sm btn-outline">Details</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

    </>);
};

export default ProfileScreen;
