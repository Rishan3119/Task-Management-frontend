import axios from 'axios';
import React, { useEffect, useState } from 'react'

function InputData({Inputdiv, setInputdiv,updatedData,setupdatedData}) {
  const [Data, setData] = useState({title:"",desc:""});

  useEffect(() => {
    setData({title:updatedData.title, desc: updatedData.desc});
    
  }, [updatedData])
  

  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setData({...Data,[name]:value});
  };
  const handleSubmit = async ()=>{
    if(Data.title === "" || Data.desc === ""){
      alert("All fields required")
    }else{
      await axios.post("http://localhost:4000/api/v2/create-task",Data,{
        headers
      });
      setData({title:"",desc:""});
      setInputdiv("hidden");
    }
  };

    const handleUpdateTask = async ()=>{
      if(Data.title === "" || Data.desc === ""){
        alert("All fields required")
      }else{
        await axios.put(`http://localhost:4000/api/v2/update-task/${updatedData.id}`,Data,{
          headers
        });
        setupdatedData({id:"",title:"",desc:""});
        setData({title:"",desc:""});
        setInputdiv("hidden");
      }
    }  

  return (
    <>
        <div className={`${Inputdiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
        <div className={`${Inputdiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
            
            <div className='w-2/6 bg-gray-900 p-4 rounded'>
            <div className='flex justify-end'>
                <button onClick={()=>{
                  setInputdiv("hidden");
                  setData({title:"",desc:""})
                  setupdatedData({id:"",title:"",desc:""});
                  }}><i className="fa-solid fa-xmark text-2xl"></i></button>
            </div>
                <input type="text" placeholder='Title' name='title' className='px-3 py-2 rounded w-full bg-gray-700 my-3'value={Data.title} onChange={handleChange} />

                <textarea name="desc" cols="30" rows="10"  placeholder='Description...' className='px-3 py-2 rounded w-full bg-gray-700 my-3' value={Data.desc} onChange={handleChange}></textarea >

                {updatedData.id === "" ? <button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' onClick={handleSubmit}>Add</button> : <button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' onClick={handleUpdateTask}>Update</button> }
                
            </div>
        </div>
    </>
  )
}

export default InputData