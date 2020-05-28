const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const uri = "mongodb://web:interface@127.0.0.1:27017/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const hostname = '127.0.0.1';
const port = 8081;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Node listening');
});

server.listen(port, hostname, () => {
    console.log(' *** Server running @ '+hostname+':'+ port +' *** ');
})

app.use(bodyParser.json());

app.use( (req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    console.log('**');
    console.log('Request from: ');
    console.log(req.hostname);
    console.log('**');
    console.log(req.ip);
    console.log('**');
    next();
   
});

app.listen(8082, function() {
    console.log(' ** Express is listening *** ');
})

app.get('/getLogs', (req, res) => {
    client.connect(() => {
        client.db("test").collection('login_logs').find({}).toArray()
        .then( items => {
            res.send(items);
        })
        
        
      });
})



app.post('/addLog', (req, res) => {
    client.connect(() => {
            try  {
                let collection = client.db("test").collection("login_logs");
                collection.insertOne(req.body)
                .then( mdb_res => {res.statusCode = 200; res.send(mdb_res);})
                .catch(mdb_res => {res.statusCode = 400; res.send(mdb_res);});
                
            } catch (err) {
                console.dir(err);
                res.statusCode = 402;
                res.setHeader('Content-Type', 'text/plain');
                res.end(JSON.stringify(err));
            }

        
    });
})

