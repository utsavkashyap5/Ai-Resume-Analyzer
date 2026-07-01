import express from "express"
import cors from 'cors';
import morgaon from 'morgan';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js';


const app = express();
app.use(helmet());
app.use(cors());
app.use(morgaon('dev'));
app.use(express.json());

app.use("/api/auth",authRoutes);

export default app;
