import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const [Data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  if (isLoggedIn) {
    navigate('/');
  }

  const validate = () => {
    let tempErrors = {};
    if (!Data.username.trim()) {
      tempErrors.username = "Username is required.";
    }
    if (!Data.password) {
      tempErrors.password = "Password is required.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:4000/api/v1/login", Data);
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        navigate('/');
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div style={{ width: '25%' }} className="p-5 rounded bg-gray-800">
        <div className='text-2xl font-semibold text-center mb-4'>Login</div>
        <input 
          type="text" 
          placeholder='Username' 
          className={`bg-gray-700 px-3 py-2 my-3 w-full rounded ${errors.username && 'border border-red-500'}`} 
          name="username" 
          onChange={handleChange} 
          value={Data.username} 
        />
        {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}

        <input 
          type="password" 
          placeholder='Enter your Password' 
          className={`bg-gray-700 px-3 py-2 my-3 w-full rounded ${errors.password && 'border border-red-500'}`} 
          name="password" 
          onChange={handleChange} 
          value={Data.password} 
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

        <p className='mb-2 text-gray-300'>Don't have an account? <Link className='font-semibold text-blue-300 hover:text-gray-300' to={'/signup'}>Signup</Link></p>

        <button 
          className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 w-full mt-2 rounded hover:bg-gray-300 transition-all duration-300' 
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
