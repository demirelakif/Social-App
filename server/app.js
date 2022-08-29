const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

var cors = require('cors')
require('./models/User')
require('dotenv').config({ path: '.env' });

app.use(bodyParser.json())

app.use(cookieParser());

app.use(cors())
     

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MongoDb Connected")
}).catch((err)=>{
    console.log(err)
})

//Import the routes
const userRoutes = require("./routes/User")
const postRoutes = require("./routes/Post")

//Using routes
app.use("/user",userRoutes)
app.use("/post",postRoutes)


const port = process.env.PORT || 5000;


app.listen(port,()=>{
    console.log(`Server Running On ${port}`)
})