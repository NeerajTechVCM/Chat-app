import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { useAuth } from '@/Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from '@chakra-ui/react'
import MovingLoader from './MovingLoader';


export default function Signup() {
const [imgLoading,setImgLoading]= useState(false)

    const [formData,setFormData]=useState({
        username:"",
        email:"",
        password:"",
    })
    const navigate = useNavigate();
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
     const [image,setImage] = useState(null)
      // const authUser = JSON.parse(localStorage.getItem("auth"));
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
   async function handleSubmit(e){
        e.preventDefault();
        // console.log("data submitted")
        // setFormData(formData);
        // console.log(formData);

        const result=await fetch("/signUp",{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({formData,image}),
            // credentials: 'include',
        });
        const data=await result.json();
        console.log(data);
       
        if(data.success){
            localStorage.setItem("auth",JSON.stringify(data));
            setAuth(data);
            navigate("/");
            toast.success(data.msg);
        }else{
            toast.error(data.msg);


        }
        setFormData({
            username:"",
        email:"",
        password:"",
        })
    }
  return (
    
    <>
    <Toaster/>

    <form action=""  onSubmit={handleSubmit}>
 <div className='flex w-[100%] space-x-3 h-screen justify-center items-center'> 
 
 
 <div className='w-[40%] hidden md:block text-center  border-4 h-[75%] rounded-md text-white border-blue-800 p-6 bg-black'>
<h1 className='text-2xl mt-36 '>Registeration  Form</h1>
 

     </div>
 <div className='w-full md:w-[40%] border space-y-5  border-red-700 rounded-md p-10'>
     <center>
     <h1 className='text-2xl '>Registeration  Form</h1>
     </center>
     <Label htmlFor="username">Enter The Username</Label>

     <Input type={"text"} id={"username"} placeholder={"Enter The Username"} name={"username"} value={formData.username} className="border" onChange={inputHandle} />
     <br />
     <Label htmlFor="email">Enter The  email address</Label>

 <Input type={"email"} id={"email"} placeholder={"Enter The email"} name={"email"} value={formData.email} className="border"onChange={inputHandle} />
 <br />
<Input type={'file'} onChange={handleFileChange}/>
 {
  imgLoading? <Progress size='xs' isIndeterminate/>:""

 }


 <Label htmlFor="password">Enter The Password</Label>

 <Input type={"password"} id={"password"} placeholder={"Enter The password"} name={"password"} value={formData.password} className="border" onChange={inputHandle}/>
 
 
 
 <div>
 <a className="link link-error" href="/login">Already Have an account?Login</a>
 </div>
 <Button variant="destructive" className='w-full' type='submit'>SignUp</Button>
 
 
 
 </div></div>


 </form>
       
   
   
      
      
    </>
  )
}
