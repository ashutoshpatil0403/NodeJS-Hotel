const mongoose=require('mongoose');
require('dotenv').config()
// const mongoURL="mongodb://127.0.0.1:27017/hotels";
const mongoURL=process.env.CLUSTER_DB_URL;
// const mongoURL=process.env.LOCAL_DB_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to mongoDB' )
})
db.on('error',(err)=>{
    console.log('MongoDB connection error',err )
})
db.on('disconnected',()=>{
    console.log('Disconnected...!' )
})

module.exports=db;