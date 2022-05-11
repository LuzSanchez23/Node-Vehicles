//Dependencies//
const mysql = require("mysql");
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const http = require("http");
const { sendfile } = require("express/lib/response");


//PORTS//
const app = express();
const PORT = 3000;

//Create Server//
var server = http.createServer(app);

// Sets up the Express app to handle data parsing and security functions
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));




//Set up DB //
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RS23',
    database: 'vehicles'
});

connection.connect(function(err){
    if (err) {throw err;
    } else { console.log ("all good with connection")}
});


//ROUTES//
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/info', function(req,res){
    res.sendFile(path.join(__dirname, './public/info.html'));
});




//(3 Routes)- 1 GET 2 POST
// Add //CREATE
// View// READ
app.post('/view', function(req,res){

    connection.query('SELECT * FROM cars WHERE cars_id =?', [req.body.cars_id], function(err,row){
   //db.each() is only ibe which is functioning while reading data from
   if (err){
       res.send("Error encountered while displaying");
       return console.error(err.message);
   }
   res.send(` id: ${row.id},    name: ${row.name}`);
   console.log("Entry displayed successful");
});
});

//Start your Server
app.listen(3000, function() {
    console.log("server is listening on port " + PORT);
});
// Closing the database connection.
app.get('/close', function(req,res){
    db.close((err) => {
        if (err) {
            res.send('There is some error in closing the database');
            return console.error(err.message);
        }
        console.log('Closing the database connection.');
        res.send('Database connection succesfully closed');
    });
});


//***BONUS AND UPDATE AND DELETE ROUTE
