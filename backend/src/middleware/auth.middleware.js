import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req,res,next) =>{
    try{
        let token;
        //Extracting the token 
        if(req.cookies && req.cookies.token){
            token = req.cookies.token;
        }

        //If no token exists, deny entry immediately
        if(!token){
            return res.status(401).json({
                success:false,
                error:"Access Denied:Authentication session token is missing."
            });
        }

        //Verifying the token signature

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        if(!req.user){
            return res.status(401).json({
                success:false,
                error:"Access Denied: Associated user profile no longer exists."
            });
        }
        // pass operational control to the next endpoint.
        return next();

    }catch(error){
        console.error(`[Auth middleware Exception]: ${error.message}`);
        return res.status(401).json({
            success:false,
            error:"Access Denied:Session token validation expired or corrupt"
        });
    };
}