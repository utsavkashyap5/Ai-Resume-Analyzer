import {s3Client} from './s3Client.js';
import dotenv from 'dotenv';
dotenv.config();

//Initializing the S3 client with the credentials from the .env file

const s3 = new s3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    }
});

export default s3;