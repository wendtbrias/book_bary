//env config
require('dotenv').config({debug:true});

//init
const express = require('express');
const app = express();
const methodOverride = require("method-override");

//route-middleware
const homeRouter = require("./router");
const authorRouter = require("./router/author");
const bookRouter = require("./router/book");

//mongodb-connection
const connect = require("./db/conn");

const port = process.env.PORT || 3000;

//set view engine
app.set('view engine' , 'ejs');

//set method override
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//use router middleware
app.use("/" , homeRouter);
app.use("/author" , authorRouter);
app.use("/book",bookRouter);

app.listen(port , () => connect(port));