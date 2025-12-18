import api from "./axiosInstance";
export const getmenuItems=async()=>{
  try{
    const response =await api.get("/");
    return response.data;
  }  
  catch(err){
    console.log(err);
    return [];
  }
    
}

export const getmenuItemsbyid=async(id)=>{
  try{
    const response =await api.post(`/category/${id}`);
    return response.data;
  }  
  catch(err){
    console.log(err);
    return [];
  }

}