require("dotenv").config()
const express = require("express");
const { connection } = require("./configs/database");
const { cloudinaryConnect } = require("./configs/cloudinary");
const fileUpload = require("express-fileupload")
const app = express();
const Upload = require("./routes/FileUpload.js")
app.use(express.json())
app.use(fileUpload({
    //true when you have to upload to some other database
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use("/api/v1/upload",Upload)
connection();
cloudinaryConnect();
app.listen(process.env.PORT,()=>{
    console.log("Start Connection to backend-server");
    
})