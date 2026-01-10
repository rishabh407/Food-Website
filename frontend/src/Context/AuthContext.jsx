import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";

const AuthContext=createContext(null);
export const AuthProvider=({children})=>{
    const [userdata, setuserdata] = useState(null);
    // useEffect(()=>{
    //      const storedUser=localStorage.getItem("userdata");   
    //      if(storedUser)
    //      {
    //          setuserdata(JSON.parse(storedUser));           
    //      }
    // },[]);
    const login=(userdt)=>{
       setuserdata(userdt);
      //  localStorage.setItem("userdata",JSON.stringify(userdt));
    }
    // const logout=()=>{
    //     setuserdata(null);
    //     // localStorage.removeItem("userdata");
    // }
    const logout = async () => {
  try {
    await api.post("/logout",
      {},
      { withCredentials: true } // 🔥 REQUIRED
    );
    // Clear frontend state
    setuserdata(null);
    toast.success("User Logout Successfully");
  } catch (error) {
    console.error("Logout failed", error);
  }
};

 return(
    <AuthContext.Provider value={{userdata,setuserdata,login,logout}}>
        {children}
    </AuthContext.Provider>
 )
}
export const useAuth=()=>useContext(AuthContext);