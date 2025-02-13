import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input"
import { useSearch } from '@/Context/SearchUserContext';
import toast, { Toaster } from 'react-hot-toast';


export default function Search() {
  const [query,setQuery] = useState("");
  const [searchResults,setSearchResults] = useSearch();
  
  const token = JSON.parse(localStorage.getItem("auth")).token;
const searchHandler = (event)=>{
  setQuery(event.target.value);
  console.log(query);
}

async function handleSubmit(e){
  e.preventDefault();


  const result=await fetch(`/search/${query}`,{
      method:"GET",
      headers:{
          "Content-Type":'application/json',
          authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(),
      credentials: 'include',
  });
  const data=await result.json();

  console.log(data.users);
 
  if(data.success){
    setSearchResults(data.users)


    toast.success(data.msg);
}else{
    toast.error(data.msg)
}
  setQuery("")
}

  return (
    <>
    <Toaster/>
    <form onSubmit={handleSubmit}>
    <div className='flex items-center space-x-1  justify-between' >
    <Input className='m-4' type={"text"} placeholder={"Search...."}  value={query} onChange={searchHandler} />

  <span>
<button type='submit'>
<FiSearch  style={{fontSize:'25px'}} className='me-8'/>
</button>

  </span>

    </div>
    </form>
        </>
  )
}
