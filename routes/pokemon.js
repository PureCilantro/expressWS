const express = require('express');
const pokemon = express.Router();
const DB = require('../config/database')

pokemon.post('/',(req, res, next) => {
    return res.status(200).send(req.body.name);
})

pokemon.get('/', async(req, res, next) => {
    const consult = await DB.query('SELECT * FROM pokemon');
    return res.status(200).json(consult);
})

pokemon.get('/:id([0-9]{1,3})',(req, res, next) => {
    const id = req.params.id - 1;
    if (id >= 0 && id <= 150) {
        return res.status(200).send(DB[req.params.id -1]);
    }
    return res.status(404).send('Pokemon no encontrado');
})

pokemon.get('/:name([A-Za-z]+)',(req, res, next) => {
    const name = req.params.name;
    
    const search = DB.filter((result) =>{
        return (result.name.toUpperCase() == name.toUpperCase()) && result;
    });

    if (search.length > 0) {
        return res.status(200).send(search);
    }    
    return res.status(404).send('Pokemon no encontrado');
    /* 
    for (i = 0; i < pokemon.length; i++) {
        
        if (pokemon[i].name.toUpperCase() == name.toUpperCase()) {
            return res.status(200).send(pokemon[i])
        }
        
    } 
    */    
})

module.exports = pokemon;