import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "@/Context/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import toast, { Toaster } from 'react-hot-toast';
import { FaCamera } from "react-icons/fa";
import React, { useState } from 'react'
import { Spinner } from "@chakra-ui/react"



export default function Profile() {
   const [auth,setAuth]=useAuth();

    const [image,setImage] = useState(null)

    const [imgLoading,setImgLoading]= useState(false)
    console.log(auth)
    const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const [formdata,setFormdata]=useState({
            username:"",
            email:"",
        
        })
        function inputHandle(e){
          e.preventDefault();
          const a=e.target.name;
          const b=e.target.value;
           setFormdata(()=>{
              return {
                 ...formdata ,[a]:b, 
              }
  
           })
              
      }
     const handleFileChange= async(e)=>{
      e.preventDefault();
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
         
         const result = await fetch('http://localhost:8080/updateProfile', {
           method: 'PUT',
           headers: {
             'Content-Type': 'application/json',
             authorization: `Bearer ${token}`,
           },
           body: JSON.stringify({formdata, image }),
         });
         const data=await result.json();
         if(data.success){
           localStorage.setItem("auth",JSON.stringify(data));
           setAuth(data);
           toast.success(data.msg);
          }else{
              toast.error(data.msg);
  
  
          }
          setFormdata({
            username:"",
        email:"",
     
        })
   
        
       } catch (error) {
         console.error('There was an error updating the name!', error);
       }
     };
  return (
    <>
    <Toaster/>
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
        <Avatar>
  <AvatarImage src={ auth.image?auth.image:''} />
  <AvatarFallback>
  {auth.username ? auth.username.charAt(0).toUpperCase() : 'CN'}
</AvatarFallback>
</Avatar>

        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription>
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
  imgLoading? <Spinner
  color="red.500"
  css={{ "--spinner-track-color": "colors.gray.200" }}
/>:""

 }
     
      </div>
      
      
     </div>
          </SheetDescription>
        </SheetHeader>


       
        <form action="">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input type={"text"} id={"username"} placeholder={auth.username} name={"username"} value={formdata.username} className="border col-span-3" onChange={inputHandle} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
             Email:
            </Label>    <Input type={"email"} id={"email"} placeholder={auth.email} name={"email"} value={formdata.email} className="border col-span-3"onChange={inputHandle} />
          </div>
        </div>
        </form>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleSubmit} >Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    </>
  )
}