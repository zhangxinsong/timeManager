const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = "mongodb://conference_91:b1cdfd980f0af6e50963@172.20.54.234:27017/conference";

const reg = require('./routes/reg');
const login = require('./routes/login');
const userInfo = require('./routes/userInfo');
const task = require('./routes/task');
const other = require('./routes/other');

mongoose.connect(url);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.all('*', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.setHeader("Access-Control-Expose-Headers", "*");
    next();
})

app.use('/reg',reg);
app.use('/login',login);
app.use('/userInfo',userInfo);
app.use('/task',task);
app.use('/other',other);

app.use('/',(req,res) => {
    res.send('Yo!');
})
 
app.listen(4000,() => {
    console.log('app listening on port 4000.')
})