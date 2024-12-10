const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });
const connectToDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connection successfull');   
    }catch(e){
        console.log(e);
    }
}
module.exports=connectToDB;