import express from 'express';
import mongoose from 'mongoose';
import { createServer } from "http";
import bodyParser from "body-parser";

import UserController from "./controllers/users/UserController";
import AuthenticationController from "./controllers/Authentication/AuthenticationController";
import ProductController from "./controllers/products/ProductController";

const connectDB = "mongodb+srv://usc_steven_chen:200810530@backend.iigppdj.mongodb.net/?retryWrites=true&w=majority";
const frontend = "http://localhost:3000";

const cors = require("cors");

const app = express();
const httpServer = createServer(app);
app.use(bodyParser.json());

app.use(cors({
    credentials: true,
    origin: [frontend, "http://ec2-34-232-65-71.compute-1.amazonaws.com:3000/", "https://main.d142bosvtdejd3.amplifyapp.com/"]
}));

mongoose.connect(connectDB);
app.use(express.json());

app.get("/", (req, res) => res.send("App is running!"));

const userController = UserController.getInstance(app);
const productController = ProductController.getInstance(app);
AuthenticationController(app);

const PORT = 4000;
httpServer.listen(process.env.PORT || PORT);