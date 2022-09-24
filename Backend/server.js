const express = require('express');
const mysql = require('mysql2')
const dbconfig = require('./configs/database-config')
pool = mysql.createPool(dbconfig.connection)
const app = express();
const adminRoute  = require('./routes/admin');

// handling requests via router
app.use(adminRoute);





app.get('/api',(req,res)=>{
    console.log('hello')
    res.status(200).json({message:'adminPortal'})
})
app.get('/users',(req,res)=>{
    console.log('hello')
    res.status(200).json({message:'userportal   '})
})
app.listen(5000)