import {User} from '../Models/users.js';
import bcrypt from 'bcrypt';
import { generateCookie } from '../utils/feature.js';


// Exporting Register function

export const userRegister = async (req,res)=>{  // /api/users/register
    
    const {name,email,password} = req.body
    
    let user = await User.findOne({email});

    if(user) return res.status(404).json({
        success:false,
        message:"User already exist"
    })
   
    const hashPassword = await bcrypt.hash(password,10);

    user = await User.create({
        name,
        email,
        password:hashPassword
    })

    generateCookie(user,res,201,"User registerd Successfully!");
}

// Exporting Login function

export const userLogin = async (req,res)=>{
    
    const {email,password} = req.body
    
    let user = await User.findOne({email});

    if(!user) return res.status(404).json({
        success:false,
        message:"user not exist"
    })
    
    const isMatch = await bcrypt.compare(password,user.password)
    
    if(!isMatch) return res.status(404).json({
        success:false,
        message:"email or password incorrect"
    })

     generateCookie(user,res,200,`Welcome ${user.name}`);
}

// Exporting Logout function

export const userLogout = (req,res)=>{
    res.status(200).cookie("token","",{
        expire:new Date(Date.now())
    }).json({
        success:true,
        message: "Logout Successfully"
    })
}

// Exporting Profile function

export const userProfile = (req,res)=>{
    res.json({
        user:req.user
    })
};


export const getUserById = async (req,res)=>{
    const id = req.params.id

    const user = await User.findById(id);

    if(!user) return res.status(404).json({
        success:false,
        message:"Please Login..."
    })

    res.json({
        success:true,
        message: "user",
        user
    })
}