// console.log('express middleware');
const express = require('express');
const fs = require("fs");
const server = express();
const morgan = require("morgan");
const path = require('path');
const PORT = 8000;

let accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'));

server.use(morgan('combined',{stream: accessLogStream}));

server.get('/',(req,res)=>{
    res.status(200).send("Home Page");
})

server.get('/get-users',(req,res)=>{
    res.status(200).json({message:"List of users"});
})

server.post("/add-user",(req,res)=>{
    res.status(201).json({message:"User added successfully"});
})

server.put("/user/:id",(req,res)=>{
    const {id} = req.params;
    res.status(201).json({message:`User with Id: ${id} updated successfully`});
})

server.delete("/user/:id",(req,res)=>{
    const {id} = req.params;
    res.status(200).json({message:`User with Id: ${id} deleted successfully`});
})

server.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
})