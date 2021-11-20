var express = require('express');
var path = require('path');
var logger = require('morgan');
var fs = require('fs').promises;
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');
//var neovis = require('neovis.js');


var app = express();

//View Engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

//neo4j.driver(Url do DataBase)
//Aonde está neo4j.auth.basic('login','senha') alterar os campos
// var driver = neo4j.driver('neo4j+s://964fa567.databases.neo4j.io', neo4j.auth.basic('neo4j','KqJ8PpexEcsOeb5IbRDszL7QZnRlkBuQEQHRv3tjksg'));
// var session = driver.session();

app.get('/', async function(req, res){
    // let registros = await session.run('MATCH(n:Movie)RETURN n LIMIT 25')
    // await fs.writeFile('registros.json', JSON.stringify(registros.records), 'utf-8');
    
    // console.log(registros.records.length)
    res.render('index')
});

app.listen(3000);
console.log('Funcionou essa merda!');

module.exports = app;

//depois de tudo instalar via terminal o nodemol versão global
// comando "npm install nodemon -g"