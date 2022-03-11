const express = require('express');
const ejs = require('ejs');
const fs= require('fs');
const app = express();
const mysql = require('mysql2');
const res = require('express/lib/response');
const req = require('express/lib/request');

app.listen(3000);
console.log('Server Start!');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kuroparfait9696',
    database: 'todo_list',
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});

app.get('/todo',(req,res) => {
    connection.query(
     'SELECT * FROM todo_table',
     (error,results) => {
        res.render('todo.ejs', {todocolumn:results}
         );
         console.log('get list success');
         console.log(results);
     }
    );
    //res.end();
});

app.get('/req',(req,res) => {
    res.render('req.ejs');
});


app.post('/create',(req,res) => {
    const ti = req.body.todoTitle;
    const mo = req.body.todoMonth;
    const da = req.body.todoDay;
    connection.query(
        'INSERT INTO todo_table(title,month,day) VALUES (?,?,?)',
        ti,mo,da);
    
    res.redirect('/todo');
});