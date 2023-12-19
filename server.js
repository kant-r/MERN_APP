import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import blogRouter from './routes/blog.js';
import {config} from 'dotenv';
import cors from 'cors'

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

config({
    path:'./data/config.env'
})

mongoose.connect(process.env.MONGO_URL,{
    dbName: "MERN_APP"
}).then(()=>{
    console.log("MongoDB is connected");
})


// Users Route
app.use('/api/users',userRouter);

// Blogs Route
app.use('/api/blogs',blogRouter);



app.listen(process.env.PORT,()=>{
    console.log(`server is runninng on port no. ${process.env.PORT}`);
})
