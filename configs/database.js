const { default: mongoose } = require("mongoose")

exports.connection =()=>{
    mongoose.connect(process.env.MONGO_DB)
    .then(console.log("connected to mongo db database"))
    .catch((err)=>{
        console.log("Error : "+err);
        process.exit(1)
    })
}