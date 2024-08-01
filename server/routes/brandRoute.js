import express from "express";
import { create, deletebrand, getAll, getone, login, update, upload } from "../controller/brandController.js";
import multer from "multer";
import path from "path";



const route = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images'); // folder location for storing image
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)); 
    }
  });
  
  const uploaded = multer({ storage: storage });


route.get("/getAll",getAll);
route.get("/getone/:id", getone);
route.post("/upload", uploaded.single('file'), upload);
route.post("/login",login);
route.post("/create", uploaded.single('file'), create);
route.put("/update/:id", update);
route.delete("/delete/:id", deletebrand);





export default route;