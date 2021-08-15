const express = require('express');
const cors = require('cors')

const api = require('./apis/api')

const port = 3000;

const app = express(); 
app.use(cors())
app.use(express.json())

app.get('/', function(req,res){
    res.send("hello from the server")
})

app.use(api)

app.listen(port,function(){
    console.log("server is listening on port " + port )
})