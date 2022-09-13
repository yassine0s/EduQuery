const express = require('express');

const app = express();
app.get('/api',(req,res)=>{
    console.log('hello')
    res.status(200).json({message:'adminPortal'})
})
app.get('/users',(req,res)=>{
    console.log('hello')
    res.status(200).json({message:'userportal   '})
})
app.listen(5000)