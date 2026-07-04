import express from "express";
import {registerUser,loginUser,logoutUser} from "../controllers/auth.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register",registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);

//Testing protected routes
router.get("/me",protect,(req,res) =>{
    return res.status(200).json({
        success:true,
        message:"Authenticated session verified successfully",
        user:{
            id: req.user._id,
            fullName:req.user.fullName,
            email:req.user.email,
            role:req.user.role
        }
    });
});

export default router;