import express from "express"
import cors from 'cors';
import morgaon from 'morgan';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/upload.routes.js'
import analyzeRoutes from "./routes/analyze.routes.js";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
  methods:["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders:["Content-Type","Authorization"]
}));
app.use(helmet());
app.use(cors());
app.use(morgaon('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use('/api/upload',uploadRoutes);
app.use("/api/analyze", analyzeRoutes);

export default app;
