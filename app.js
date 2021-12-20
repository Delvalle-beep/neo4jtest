var express = require('express');
var path = require('path');
var logger = require('morgan');
var fs = require('fs').promises;
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');
// var neovis = require('neovis.js');


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

app.get('/', async function(req, res){
         var config = {
        container_id: "viz",
        server_url:"bolt://824d2fd3.databases.neo4j.io",
        server_user: "neo4j",
        server_password: "cWiIFqGtm45j2kVFVIeqliZKEZSrGSb-UB1kgNrEG10",
        labels: {
            "Team":{
                "size":1.0
            },
            "Member": {
                "size":1.0,
                "community": "community"
            },
            "Initative":{
                "size":1.0
            }
        },
        relationships: {
            "Merber_Of": {
            },
            "Working_ON": {   
            }
        },
        initial_cypher: `LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/Meisam-A/ER/main/dummy%20to%20be%20visualized.xlsx%20-%20member_of.csv' AS row_t
                         LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/Meisam-A/ER/main/dummy%20to%20be%20visualized.xlsx%20-%20working_on.csv' AS row_i
                         MATCH (t:Team {Name: row_t.Team}),
                         (n:Member {Name: row_t.Member_T}),
                         p = shortestPath((n)-[:Member_Of]->(t))
                         MATCH (i:Initative {Name: row_i.Initative}),
                         (m:Member {Name: row_i.Member_I}),
                         q = shortestPath((m)-[:Working_ON]->(i))
                         RETURN p,q`,

        encrypted: "ENCRYPTION_OFF",
        trust: "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES"
    };
//SET linhas após o titulo, renomear label atual 
    res.render('index', {configs: config});
})

app.listen(3000);

module.exports = app;

//depois de tudo instalar via terminal o nodemon versão global
// run "npm install" at the first time
// comando "npm install nodemon -g" 

//"nodemon app.js" or "node app.js"