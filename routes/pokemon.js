const express = require('express');
const pokemon = express.Router();
const DB = require('../config/database')

pokemon.post('/',(req, res, next) => {
    return res.status(200).json(req.body);
})

pokemon.get('/', async(req, res, next) => {
    const consult = await DB.query("SELECT * FROM pokemon");
    return res.status(200).json({ code: 1, message: consult});
})

pokemon.get('/:id([0-9]{1,3})',async(req, res, next) => {
    const id = req.params.id - 1;
    if (id >= 0 && id <= 150) {
        const consult = await DB.query("SELECT * FROM pokemon WHERE pok_id = '" + id +"' ;");
        return res.status(200).json({ code: 1, message: consult});
    }
    return res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
})

pokemon.get('/:name([A-Za-z]+)',async(req, res, next) => {
    const name = req.params.name;

    const consult = await DB.query("SELECT * FROM pokemon WHERE pok_name LIKE '" + name +"' ;");

    if (consult.length > 0) {
        return res.status(200).json({ code: 1, message: consult});
    }    
    return res.status(404).json({ code: 404, message: "Pokemon no encontrado" }); 
})

module.exports = pokemon;