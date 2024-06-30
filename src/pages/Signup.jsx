import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from "react-redux";

function Signup() {
  const history = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn === true){
    history('/');
  }
  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});


  const validate = () => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!Data.username || Data.username.length < 4) {
      tempErrors.username = "Username must be at least 4 characters long";
    }

    if (!Data.email || !emailPattern.test(Data.email)) {
      tempErrors.email = "Enter a valid email";
    }

    if (!Data.password || Data.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
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
        const response = await axios.post('http://localhost:4000/api/v1/sign-in', Data);
        setData({ username: "", email: "", password: "" });
        alert(response.data.message);
        history("/login");
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div style={{ width: '25%' }} className="p-5 rounded bg-gray-800">
        <div className='text-2xl font-semibold text-center mb-4'>SignUp</div>
        <input
          type="text"
          placeholder='username'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
          name="username"
          onChange={handleChange}
          value={Data.username}
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}

        <input
          type="email"
          placeholder='Enter your email'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
          name="email"
          onChange={handleChange}
          value={Data.email}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input
          type="password"
          placeholder='Enter your Password'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
          name="password"
          onChange={handleChange}
          value={Data.password}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <p className='mb-2 text-gray-300'>Already have an account? <Link className='font-semibold text-blue-300 hover:text-gray-300' to={'/login'}>Login</Link></p>

        <button
          className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 w-full mt-2 rounded hover:bg-gray-300 transition-all duration-300'
          onClick={handleSubmit}
        >
          SignUp
        </button>
      </div>
    </div>
  );
}

export default Signup;
