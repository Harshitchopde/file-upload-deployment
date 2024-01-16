const mongoose = require("mongoose")
const nodemailer = require("nodemailer");
const fileSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,

    },
    tags:{
        type:String
    }
})
// const DataFile= mngoose.model("File",fileSchema)
fileSchema.post('save',async function(doc){
   try {
    console.log(doc);
    const transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        }
    })
    console.log("process yha tak info baki hai");
    
    const info = await transporter.sendMail({
        from: 'Harshit - Chopde', // sender address
        to: doc.email, // list of receivers
        // to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Namaste world?", // plain text body
        html: "<b>Namaste world?</b>", // html body
      });
      console.log("Info : ",info);
      
   } catch (error) {
    console.log("ERRor ",error);
    
   }
    
})
const DataFile = mongoose.model("DataFile",fileSchema)
module.exports = DataFile
