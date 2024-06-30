import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../../store/auth';
import axios from 'axios';

function Sidebar() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All Tasks",
      icon:<i className="fa-solid fa-note-sticky"></i>,
      link: "/",
    },
    {
      title: "Important Tasks",
      icon:<i className="fa-solid fa-star"></i>,
      link: "/importantTasks",
    },
    {
      title: "Completed Tasks",
      icon:<i className="fa-solid fa-check-double"></i>,
      link: "/completedTasks",
    },
    {
      title: "Incompleted Tasks",
      icon:<i className="fa-solid fa-circle-xmark"></i>,
      link: "/incompletedTasks",
    },
  ];
  const [Data, setData] = useState()
   const handleLogout = ()=>{
    dispatch(authActions.logout);
    localStorage.clear("id");
    localStorage.clear("token");
    history('/signup')
  };
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () =>{
    const response =await axios.get("http://localhost:4000/api/v2/get-all-tasks", {
      headers
    });
    setData(response.data.data)
    };
    if(localStorage.getItem("id")&& localStorage.getItem("token") ){
      fetch();
    }
  }, []);
  
  return (
    <>
      {
        Data && (
        <div>
        <h2 className='text-xl font-semibold'>{Data.username}</h2>
        <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
        <hr />
      </div>
        )
      }
      <div>
        {data.map((items, i) => (
          <Link to={items.link} key={i} className='my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300'>{items.icon}&nbsp; {items.title}</Link>
        ))}
      </div>
      <div>
        <button className='bg-gray-600 w-full p-2 rounded' onClick={handleLogout}>Log Out</button>
        </div>
    </>
  )
}

export default Sidebar