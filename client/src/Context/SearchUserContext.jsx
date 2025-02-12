import React, { createContext, useContext, useState } from 'react'

 const SearchUserContext=createContext();

export default function SearchProvider({children}) {
    
    const [searchResults,setSearchResults]=useState([]);
  return (
   <SearchUserContext.Provider value={[searchResults,setSearchResults]}>
    {children}
   </SearchUserContext.Provider>
  )
}

export const useSearch=()=>useContext(SearchUserContext);