const express = require('express');
const poiRouter = express.Router();
const con = require('../mysqlconn');


poiRouter.get('/', (req,res) => {
    con.query(`SELECT * FROM pointsofinterest`, (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

poiRouter.get('/name/:name', (req, res) => {
    con.query(`SELECT * FROM pointsofinterest WHERE name=?`,
        [req.params.name], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

poiRouter.get('/region/:region', (req, res) => {
    con.query(`SELECT * FROM pointsofinterest WHERE region=?`,
        [req.params.region], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

poiRouter.get('/country/:country', (req, res) => {
    con.query(`SELECT * FROM pointsofinterest WHERE country=?`,
        [req.params.country], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

poiRouter.get('/type/:type', (req, res) => {
    con.query(`SELECT * FROM pointsofinterest WHERE type=?`,
        [req.params.type], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

poiRouter.post('/:id/recommend', (req,res) => {
    con.query('UPDATE pointsofinterest SET recommendations=recommendations+1 WHERE id=?', [req.params.id], (error,results,fields)=> {
        if(error) {
            res.status(500).json({error: error});
        } else if(results.affectedRows==1) {
            res.json({'message': 'Successfully recommended.'});
        } else {
            res.status(404).json({error: 'No rows updated, could not find a point of interest with matching name'});
        }
    } );
});


poiRouter.post('/review', (req,res) => {
    if(!req.body.review || req.body.review.length === 0) {
        return res.status(400).json({message: "Invalid data"});
    } 
    con.query('INSERT INTO poi_reviews(poi_id,review) VALUES (?,?)',[req.body.poi_id, req.body.review], (error,results, fields)=> {
        if(error) {
            res.status(500).json({error: error});
        } else {
            res.json({'message': 'Successfully reviewed.'});
        }
    } );  
});

module.exports = poiRouter;