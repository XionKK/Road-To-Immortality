const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env'});

const app = express();
const port = process.env.PORT || 5000
//database

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false}))
//Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));//for frontend
 
app.set('view engine', 'hbs');

db.connect((err) =>{
    if(err){
        console.log(err)
    } else {
        console.log("MYSQL Connected...")
    }

})

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen(port, () => console.log(`Server started on ${port}`))