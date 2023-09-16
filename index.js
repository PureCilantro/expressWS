const express = require('express')
const app = express()
const {pokemon} = require('./pokedex.json')

app.get('/',(req, res, next) => {
    res.status(200).send('Bienvenido al Pokedex')
})

app.get('/pokemon',(req, res, next) => {
    res.status(200).send(pokemon)
})

app.get('/pokemon/:id([0-9]{1,3})',(req, res, next) => {
    const id = req.params.id - 1;
    if (id >= 0 && id <= 150) {
        return res.status(200).send(pokemon[id])
    }
    res.status(404).send('Pokemon no encontrado')
})

app.get('/pokemon/:name([A-Za-z]+)',(req, res, next) => {
    const name = req.params.name;
    
    const search = pokemon.filter((result) =>{
        return (result.name.toUpperCase() == name.toUpperCase()) ? result : null
    });

    if (search.length > 0) {
        return res.status(200).send(search)
    }    
    return res.status(404).send('Pokemon no encontrado')
    /* 
    for (i = 0; i < pokemon.length; i++) {
        
        if (pokemon[i].name.toUpperCase() == name.toUpperCase()) {
            return res.status(200).send(pokemon[i])
        }
        
    } 
    */    
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
})