const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool.js');

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
  let sqlQuery = `
    SELECT * FROM "koalas" 
      ORDER BY "id";
  `;
  pool.query(sqlQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('error', dbErr);
      res.sendStatus(500);
    });
});


// POST
koalaRouter.post('/',  (req, res) => {
  let newKoala = req.body;
  console.log(newKoala);

  let sqlQuery = `
    INSERT INTO "koalas" 
    ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES ($1, $2, $3, $4, $5);
  `;
  let sqlValues = [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_transfer, newKoala.notes];
  pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.sendStatus(500);
    });
});

// PUT
koalaRouter.put('/:id', (req, res) => {
  console.log('req.params:', req.params);
  console.log('req.body:', req.body);
  let idToUpdate = req.params.id;
  let transferStatus = req.body.ready_to_transfer;

  let sqlQuery = `
    UPDATE "koalas"
	    SET "ready_to_transfer"=$1
	    WHERE "id"=$2;
  ` 
  let sqlValues = [transferStatus, idToUpdate];
  pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.sendStatus(500);
    })
})

// DELETE
koalaRouter.delete('/:id', (req, res) => {
  console.log(req.params);
  let idToDelete = req.params.id;

  let sqlQuery = `
    DELETE FROM "koalas"
      WHERE "id"=$1;        
  `
  let sqlValues = [idToDelete];
  pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log( dbErr);
      res.sendStatus(500);
    })
})
module.exports = koalaRouter;