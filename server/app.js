require("dotenv").config();
const express = require("express");
const cors = require("cors");
 const moment = require("moment");
const path = require("path"); 
const mongoose = require("mongoose");
const app = express();
app.use(cors());



/* mongoose.connect("mongodb://127.0.0.1:27017/MERN-AUTH");  */
mongoose.connect("mongodb://mo1059_mern_auth:Jabadaba12@mongo57.mydevil.net:27017/mo1059_mern_auth");

const port = 8081;

const connection = mongoose.connection;
connection.on("error", (error) => {
  console.log(error);
});
connection.on("connected", () => {
  console.log("Connection Successfull");
});

app.use(express.json());

const customerRouter = require("./routers/customerRouters");
const userRouter = require("./routers/userRouters");
const plainRouter = require("./routers/plainRouters");
const uploadRouter = require("./routers/uploadRouters");
const tempRouter = require("./routers/tempRouters");
const actionRouter = require("./routers/actionRouters");
const carOptionRouter = require("./routers/carOptionRouters");
const companyDataRouter = require("./routers/companyDataRouters");
const carRouter = require("./routers/carRouters");
const authRouter = require("./controllers/indexControllerAuth");
const offerRouter = require("./routers/offerRouters"); 

moment.locale();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/customer", customerRouter);
app.use("/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/plain/", plainRouter);
app.use("/upload", uploadRouter);
app.use("/temp", tempRouter);
app.use("/action", actionRouter);
app.use("/category", carOptionRouter);
app.use("/company", companyDataRouter);
app.use("/car", carRouter);
app.use("/offer", offerRouter); 

app.get("/", (req, res) => {
  res.send("Witam Nod JS ");
});
app.listen(port, () => {
  console.log(`Server MERN AUTH work on port ${port} `);
});
