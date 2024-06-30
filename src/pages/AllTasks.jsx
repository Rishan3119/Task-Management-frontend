import React, { useEffect, useState } from 'react'
import Cards from '../components/home/Cards'
import InputData from '../components/home/InputData'
import axios from 'axios';

function AllTasks() {
  const [Inputdiv, setInputdiv] = useState("hidden");
  const [Data, setData] = useState();
  const [updatedData, setupdatedData] = useState({id:"",title:"",desc:""});

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
    
  });
  
  return (
   <>
      <div>
          <div className="w-full flex justify-end px-4 py-2"> 
              <button onClick={()=>setInputdiv("fixed")} >
              <i className="fa-solid fa-circle-plus text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300 "></i>
              </button>
          </div>
          {Data &&( 
            <Cards home={"true"} setInputdiv={setInputdiv} data={Data.tasks} setupdatedData={setupdatedData} />
            )}
      </div>
      <InputData Inputdiv={Inputdiv} setInputdiv={setInputdiv} updatedData={updatedData} setupdatedData={setupdatedData} />
   </>
  )
}

export default AllTasks