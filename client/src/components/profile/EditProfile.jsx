import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAuth } from '@/Context/AuthProvider'
import MovingLoader from '../Auth/MovingLoader';
import { FaCamera } from "react-icons/fa";
export default function EditProfile() {
  const [image,setImage] = useState(null)
 const [auth,setAuth]=useAuth();
 const [imgLoading,setImgLoading]= useState(false)
 console.log(auth)
 const token = JSON.parse(localStorage.getItem("auth"))?.token;
  const handleFileChange= async(e)=>{
    setImgLoading(true);
    let img=e.target.files[0];
    // setSelectedFile(event.target.files[0])
    try {
      const formData = new FormData ()
    console.log(img)
    
        formData.append('file',img)
        formData.append('upload_preset','chat-app')
        formData.append('cloud_name','dbggewejk')
    console.log(formData)
        const result=await fetch('https://api.cloudinary.com/v1_1/dbggewejk/image/upload',{
          method:"POST",
          // mode: 'no-cors',
          
          body:(formData)
          // credentials: 'include',
      });
      const data=await result.json();
    console.log(data.url)
      setImage(data.url)
      setImgLoading(false);
  
     
    } catch (error) {
      
    }
      
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const result = await fetch('/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image }),
      });
      const data=await result.json();
      if(data.success){
        localStorage.setItem("auth",JSON.stringify(data));
        setAuth(data);
      
    }

     
    } catch (error) {
      console.error('There was an error updating the name!', error);
    }
  };
  return (
    <>
     <div className="flex flex-col h-screen w-full bg-gray-300">
     <div className="flex  p-5 text-xl items-center justify-between rounded-md mt-1 ">
     <h1 className='text-2xl font-bold'>Edit Profile</h1>
     <Button onClick={handleSubmit} >Save</Button>
     </div>
     <div className="flex flex-col space-y-3 justify-center p-5 text-xl items-center rounded-md mt-1 ">
           <Avatar className='h-48 w-48  md:h-72 md:w-72'>
         <AvatarImage src={ auth.image?auth.image:''} />
         <AvatarFallback>
         {auth.username ? auth.username.charAt(0).toUpperCase() : 'CN'}
       </AvatarFallback>
      </Avatar>

      <div className="flex justify-center items-center space-x-4">
        <label htmlFor="image"><FaCamera /></label>
        <Input id="image" type={'file'} onChange={handleFileChange} className="hidden"/>
      {
  imgLoading?<MovingLoader/>:""

 }
     
      </div>
      
      
     </div>
     <div className="flex  p-5 text-xl text-red-600 items-center rounded-md mt-1 ">{auth.username?auth.username:"Unknown"}</div>
     <div className="flex  p-5 text-xl text-red-600 items-center rounded-md mt-1 ">{auth.email?auth.email:"Unknown@gmail.com"}</div>
    

        </div> 
    </>
  )
}
