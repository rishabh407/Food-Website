import jwt from "jsonwebtoken"
export const generatetoken=(user)=>{
    return jwt.sign({
      id:user._id
    },process.env.JWT_SECRET,{
        expiresIn:"7d"
    }
)
}