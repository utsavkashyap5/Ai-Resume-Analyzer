import mongoose from "mongoose";
import 'dotenv/config'
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MONGODB')
    } catch (err) {
        console.log("Database connecction error", err)
    }
}
export default connectDB;