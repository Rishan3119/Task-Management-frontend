import axios from 'axios'
import React, { useState } from 'react'

function Cards({home,setInputdiv,data,setupdatedData}) {
    const headers = {
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
      };

    const handleCompleteTask = async (id) =>{
        try {
         await axios.put(`http://localhost:4000/api/v2/update-complete-task/${id}`,
                {},
                {headers}
            );
            
        } catch (error) {
            console.log(error)
        }
    };
    const handleImp = async (id) =>{
        try {
         const response = await axios.put(`http://localhost:4000/api/v2/update-imp-task/${id}`,
                {},
                {headers}
            );
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    };

    const handlUpdate =  (id,title,desc)=>{
        setInputdiv("fixed");
        setupdatedData({id: id, title: title, desc: desc})
    }

    const handleDelete = async (id) =>{
        try {
         const response = await axios.delete(`http://localhost:4000/api/v2/delete-task/${id}`,
                {headers}
            );
            console.log(response.data.message);
        } catch (error) {
            console.log(error)
        }
    };

  
  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
        {data && 
        data.map((items,i)=>( 
            <div className='flex flex-col justify-between bg-gray-800 rounded-sm p-4'>
        <div >
            <h3 className='text-xl font-semibold'>{items.title}</h3>
            <p className='text-gray-300 my-2'>{items.desc}</p>
            
        </div>
        <div className='mt-4 w-full flex items-center'>
                <button  className={`${items.complete === false ?"bg-red-400" : "bg-green-700" } p-2 rounded w-3/6`} onClick={()=>handleCompleteTask(items._id)} >{items.complete === true ? "Completed":"In Completed" } </button>
                <div className='text-white  p-2 w-3/6 text-2xl flex justify-around font-semibold'>
                    <button onClick={()=>handleImp(items._id)}>
                     {items.important === false ? <i class="fa-regular fa-heart"></i> :<i className="fa-solid fa-heart text-red-500"></i>}
                    </button>

                   {home !== "false" && (
                     <button onClick={()=>handlUpdate(items._id, items.title,items.desc)}><i className="fa-regular fa-pen-to-square text-blue-500"></i></button>
                   )}

                    <button onClick={()=>handleDelete(items._id)}><i className="fa-solid fa-trash text-red-700"></i></button>
                </div>
            </div>
            </div>
        ) )}
        {home==="true" &&(
          <button className='flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300' onClick={()=>setInputdiv("fixed")}>
             <i className="fa-solid fa-circle-plus text-5xl "></i>
                <h2 className='text-2xl mt-4'>Add Task</h2>
            </button>
        ) }

        
    </div>
  )
}

export default Cards