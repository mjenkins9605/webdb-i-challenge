const express = require('express');

const server = express();

server.use(express.json());

// your code here
server.get("/", (req, res) => {
    res.send(
      "There are three kinds of people in this world, those who can count and those who can not."
    );
  });
  
module.exports = server;