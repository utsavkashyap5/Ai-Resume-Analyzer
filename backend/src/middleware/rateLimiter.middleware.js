import {rateLimit} from "express-rate-limit";

const aiRateLimiter = rateLimit({
    //24 hours

    windowMs :24 * 60 * 60* 1000,

    //5 analyses per window
    max:5,

    //Use logged-in user instead of IP

    keyGenerator:(req) => req.user._id.toString(),
    standardHeaders:true,
    legacyHeaders:false,

    message:{
        success:false,
        message:"Daily analysis limit reahed.Please try again tomorrow."
    },
});

export default aiRateLimiter;