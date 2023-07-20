//Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const cors = require('cors');
const port = 3000;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

//Set up the web server
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//Get all comments
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        res.send(JSON.parse(data));
    });
});

//Post a comment
app.post('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        let comments = JSON.parse(data);
        let newComment = {
            id: uuidv4(),
            name: req.body.name,
            message: req.body.message
        }
        comments.push(newComment);
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                return console.log(err);
            }
            res.send(newComment);
        }
        );
    });
});



