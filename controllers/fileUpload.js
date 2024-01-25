const DataFile = require("../models/DataFile.js");

const cloudinary = require("cloudinary").v2


exports.localfileupload = (req,res)=>{
    try {
        const singlefile = req.files.file;
        console.log("File: ",singlefile);
        const path = __dirname +"/files/"+Date.now()+`.${singlefile.name.split(".")[1]}`;
        console.log(path);
        singlefile.mv(path,(err)=>{
            console.log("Error: ",err)
        })
        res.json({
            status:200,
            message:"Success full uploaded"
        })

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
        
    }
}
function isSupportedFormat(type,supportedFormat){
    return supportedFormat.includes(type);
}
async function upoadFile(file,folder){

    // console.log(option);                 
    const option = +                                                                                       {folder}
    console.log("2");
    
    
    return await cloudinary.uploader.upload(file.tempFilePath,{option})
}
exports.fileUpload =async (req,res)=>{
    try {
        const {name,email,tags} = req.body;
        const file = req.files.imageFile;
        // console.log("File: ",file);
        const type = file.name.split(".")[1].toLowerCase();
        const supportedFormat = ["jpg","png","jpeg"];

        if(!isSupportedFormat(type,supportedFormat)){
            return res.status(400).json({
                status:false,
                message:"File format not supported"
            })
        }
        // console.log("uploading to cloudinary");
        const folder = "FileUpload_bgn"
        console.log("1");
        
        const result =await upoadFile(file,folder)
        console.log("3");
        
        console.log(result);
        
        const imageUrl = result.url;
        console.log("Fd",imageUrl);
        console.log("4",Date.now());
        
        const uplToDb =new  DataFile({name,email,tags,imageUrl})
        const saved = await uplToDb.save();

        
        
        
        res.json({
            status:200,
            message:"Success full uploaded",
            saved
})

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}