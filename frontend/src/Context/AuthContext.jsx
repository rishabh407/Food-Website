import { createContext, useContext, useEffect, useState } from "react";

const AuthContext=createContext(null);
export const AuthProvider=({children})=>{
    const [userdata, setuserdata] = useState(null);
    useEffect(()=>{
         const storedUser=localStorage.getItem("userdata");   
         if(storedUser)
         {
             setuserdata(JSON.parse(storedUser));           
         }
    },[]);
    const login=(userdt)=>{
       setuserdata(userdt);
       localStorage.setItem("userdata",JSON.stringify(userdata));
    }
    const logout=()=>{
        setuserdata(null);
        localStorage.removeItem("userdata");
    }
 return(
    <AuthContext.Provider value={{userdata,login,logout}}>
        {children}
    </AuthContext.Provider>
 )
}
export const useAuth=()=>useContext(AuthContext);