import api from "./axiosInstance";
export const getmenuItems=async()=>{
  try{
    const response =await api.get("/products");
    return response.data;
  }  
  catch(err){
    console.log(err);
    return [];
  }    
}

export const getmenuItemsbyid=async(id)=>{
  try{
    const response =await api.get(`/category/${id}`);
    return response.data;
  }  
  catch(err){
    console.log(err);
    return [];
  }

}