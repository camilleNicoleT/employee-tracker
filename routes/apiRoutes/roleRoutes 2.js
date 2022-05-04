const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

router.get('/role/:id', (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

//create an role
router.post('/role', ({ body }, res) => {
    const errors = inputCheck(
        body, 'title', 'salary'
      );
      if (errors) {
        res.status(400).json({ error: errors });
        return;
      }
      const sql = `INSERT INTO roles (title, salary)
      VALUES (?,?,?)`;
    const params = [body.title, body.salary];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });


  //delete a role
  router.delete('/role/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
    });
  });
  
module.exports = router;