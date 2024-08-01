import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotnev from "dotenv";
import cors from "cors";
import route from "./routes/brandRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(cors()); 
app.use("/api",route);
app.use(express.static('public'))
dotnev.config();


const PORT = process.env.PORT||7000;
const URL = process.env.MONGOURL;

mongoose.connect('mongodb+srv://prathameshghadge2005:0kPBtaIwV7k6SNRL@cluster0.c9mdjv3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Optional, default is 30000
  })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


app.listen(PORT,()=>{
    console.log(`server is running on port:${PORT}`);

})


