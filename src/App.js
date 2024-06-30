import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AllTasks from './pages/AllTasks';
import ImportantTasks from './pages/ImportantTasks';
import CompletedTasks from './pages/CompletedTasks';
import IncompletedTasks from './pages/IncompletedTasks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { authActions } from './store/auth';
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
 useEffect(() => {
  if(localStorage.getItem("id") && localStorage.getItem("token")){
    dispatch(authActions.login())
  }else if(isLoggedIn === false){
    navigate('/signup');
  }
 
 }, []);
 
  return (
     <div className='bg-gray-900 text-white h-screen p-2 relative'>
      <Routes>
        <Route path='/' element={<Home/>} >
          <Route index element={<AllTasks/>} />
          <Route path='/importantTasks' element={<ImportantTasks/>} />
          <Route path='/completedTasks' element={<CompletedTasks/>} />
          <Route path='/incompletedTasks' element={<IncompletedTasks/>} />
        </Route>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
     </div>
   
  );
};

export default App;
