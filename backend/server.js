import app from "./src/app.js"
import 'dotenv/config'
import connectDB from "./src/db/db.js";
const server = app;

connectDB();
const PORT = process.env.PORT
server.listen(process.env.PORT,()=>{
    console.log("Server is running or port",PORT);
})
