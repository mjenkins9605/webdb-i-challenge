const express = require("express");
const accountsModel = require("./data/accounts-model.js");

const server = express();

server.use(express.json());

// your code here
server.get("/", (req, res) => {
  res.send(
    "There are three kinds of people in this world, those who can count and those who can not."
  );
});

server.get("/api/accounts-model", (req, res) => {
  accountsModel
    .find()
    .then(accounts => {
      res.json(accounts);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The account information could not be retrieved."
      });
    });
});

server.post("/api/accounts-model", (req, res) => {
  const account = req.body;
  accountsModel
    .add(account)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "There was an error while saving the account to the database"
      });
    });
});

server.get("/api/accounts-model/:id", (req, res) => {
  const accountId = req.params.id;
  accountsModel
    .findById(accountId)
    .then(account => {
      if (account) {
        accountsModel.findById(accountId).then(findAccount => {
          res.status(201).json(findAccount);
        });
      } else {
        res.status(404).json({
          error: err,
          message: "The account with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The account information could not be retrieved."
      });
    });
});

server.delete("/api/accounts-model/:id", (req, res) => {
  const id = req.params.id;
  accountsModel
    .remove(id)
    .then(deleted => {
      res.status(201).end();
    })
    .catch(err => {
      res.status(404).json({
        error: err,
        message: "The account with the specified ID does not exist."
      });
    });
});

server.put("/api/accounts-model/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  accountsModel
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(400).json({
          message: "The account with the specified ID does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The account information could not be modified."
      });
    });
});

module.exports = server;
