import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { useAuth } from '@/Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LuMessageCircleMore } from "react-icons/lu";

export default function Login() {
    const [formData,setFormData]=useState({
       
        email:"",
        password:"",
    })
    const navigate=useNavigate();
        const [auth,setAuth]=useAuth();
    function inputHandle(e){
        const a=e.target.name;
        const b=e.target.value;
         setFormData(()=>{
            return {
               ...formData ,[a]:b, 
            }

         })
            
    }
  async  function handleSubmit(e){
        e.preventDefault();
        // console.log("data submitted")
        // setFormData(formData);
        console.log(formData);
        const result=await fetch("/login",{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify(formData),
            credentials: 'include',
        });
        const data=await result.json();

        
        

        if(data.success){
            localStorage.setItem("auth",JSON.stringify(data));
            setAuth(data);
            navigate("/");
            toast.success(data.msg);
        }else{
            toast.error(data.msg)
        }
        setFormData({
            
        email:"",
        password:"",
        })
      
    }
  return (
    
    <>
    <Toaster/>

<form action=""  onSubmit={handleSubmit}>
<div className='flex flex-col md:flex-row w-[100%] space-x-3  h-screen justify-center items-center'> 

<div className='w-[98%] bg-slate-100 flex space-x-4 border-4 fixed top-2  justify-center items-center  md:hidden text-center h-[10%] rounded-md  border-blue-800 p-6 '>

<LuMessageCircleMore  style={{fontSize:"40px"}} /> <span className='text-3xl'>Chat App</span>
</div>

<div className='w-[40%] border-4 hidden md:block text-center h-[60%] rounded-md text-white border-blue-800 p-6 bg-black'>
<h1 className='text-2xl mt-36'>Login Form</h1>

    </div>
<div className='w-full md:w-[40%] border space-y-5  border-red-700 rounded-md p-10'>
    <center>
    <h1 className='text-2xl'>Login Form</h1>
    </center>
 <Label htmlFor="email">Enter The  email address</Label>
<Input type={"email"} id={"email"} placeholder={"Enter The email"} name={"email"} value={formData.email} className="border"onChange={inputHandle} />
 <br />
 <Label htmlFor="password">Enter The Password</Label>
<Input type={"password"} id={"password"} placeholder={"Enter The password"} name={"password"} value={formData.password} className="border" onChange={inputHandle}/>

<div>
<a className="link link-error" href="/signUp">Don't Have an account? Sign Up</a></div>
<Button variant="destructive" className='w-full' type='submit'>Login</Button>



</div></div>
</form>

      
      
    </>
  )
}