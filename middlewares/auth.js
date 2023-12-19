import jwt from 'jsonwebtoken'
import { User } from '../Models/users.js'



export const isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies
    
    if(!token) return res.status(404).json({
        success: false,
        message:"Please Login..."
    })

    const decode = jwt.verify(token,process.env.JWT_SECRET)
    // console.log(decode)
    req.user = await User.findById(decode._id);
    // console.log(req.user);
    next();
}