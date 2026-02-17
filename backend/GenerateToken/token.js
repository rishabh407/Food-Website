import jwt from "jsonwebtoken"
import {v4 as uuid} from "uuid";
export const generatetoken=(user)=>{
    return jwt.sign({
      id:user._id
    },process.env.JWT_SECRET,{
        expiresIn:"15min"
    }
)
}

export const generateRefreshToken=(user)=>{
   return uuid(); // random string 
}

// uuid is safe because its very difficult to duplicate uuid that's why we use them.