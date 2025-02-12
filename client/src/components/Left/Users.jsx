import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import User from './User';
import { useAuth } from '@/Context/AuthProvider';
import { useSearch } from '@/Context/SearchUserContext';



export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem("auth")).token;
  const [searchResults,setSearchResults] = useSearch();
   
  useEffect(() => {
    async function fetchUsers() {
      try {
        const result = await fetch("http://localhost:8080/getAllUsers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        const data = await result.json();
        console.log(data.allUsers);
        if (data.allUsers) {
          setUsers(data.allUsers);
         
        } else {
          setError('No users found.');
        }
      } catch (error) {
        setError('An error occurred while fetching users.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (error) {
    return <div>{error}</div>;
  }
  const displayUsers = searchResults.length > 0 ? searchResults : users;
  return (
    <div className="overflow-y-scroll h-[80%]">
      {


(displayUsers.length > 0 ? (
  displayUsers.map((user) => <User key={user._id} user={user} />)
) : (
  <div>No users available.</div>
))}
    </div>





  );
}
