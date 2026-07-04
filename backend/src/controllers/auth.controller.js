import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const cookieOptions ={
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    sameSite:"strict",
    maxAge:7*24*60*60*1000 //7 days
}

export const registerUser = async (req,res) =>{
    try {
        const {fullName,email,password,phone,role} = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({
                message:"Please provide all the required fields"
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"Email already exists."
            })
        }
        if(phone){
            const existingPhone = await User.findOne({phone});
            if(existingPhone){
                return res.status(400).json({
                    success:false,
                    message:"Phone number already exists."
                })
            }
        }

        
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            fullName,
            email,
            phone,
            password:hashedPassword,
            role:role || "user"
        });

        const token = jwt.sign(
            {id:newUser._id,role:newUser.role},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        );

        res.cookie('token',token,cookieOptions);

        res.status(201).json({
            success:true,
            message:"User registered successfully!",
            user:{
                id:newUser.id,
                fullName:newUser.fullName,
                email:newUser.email,
                phone:newUser.phone,
                role:newUser.role,
            },
        });
}catch (error){
    res.status(500).json({
        success:false,
        message:"Server Error",
        error:error.message
    });
}
}


//Login User Controller
export const loginUser = async (req,res) =>{
    try {
        const {email,password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all the required fields"
            })    
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        );

        res.status(200).json({
            success:true,
            message:"User logged in successfully!",
            token,
            user:{
                id:user.id,
                fullName:user.fullName,
                email:user.email,
                phone:user.phone,
                role:user.role,
            },
        });
    }
 catch (error){
    res.status(500).json({
        success:false,
        message:"Server Error",
        error:error.message
    })
}}

//Logout User Controller
export const logoutUser = async (req,res) =>{
    try {
        res.clearCookie('token');

        res.status(200).json({
            success:true,
            message:"User Logged out successfully!"
        });
    } catch (error){
        res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message,
        })
    }
}