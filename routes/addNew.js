const express = require('express');
const path = require('path');
const addNewRouter = express.Router();
const con = require('../mysqlconn');

addNewRouter.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname , "../public/addNew.html"))
    // console.log( );
});

addNewRouter.post('/poi', (req,res) => {
    if(!req.body.name || !req.body.type || !req.body.country || !req.body.region || !req.body.lon || !req.body.lat || !req.body.description){
        return res.status(400).json({message: "Invalid data. Please fill all of the fields and try again."});
    }
    con.query('INSERT INTO pointsofinterest(name,type,country,region,lon,lat,description) VALUES (?,?,?,?,?,?,?)',[req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description], (error,results, fields)=> {
        if(error) {
            res.status(500).json({error: error});
        } else {
            res.json({success: 1});
        }
    } );
});

module.exports = addNewRouter;