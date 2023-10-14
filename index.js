//Dependencies
const express = require('express');
const morgan = require('morgan');
const app = express();
//Routers
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true})); 

app.get('/',(req, res, next) => {
    return res.status(200).json({ code: 1, message: "Bienvenido al pokedex" });
})

app.use('/user', user);

app.use(auth);

app.use('/pokemon', pokemon);

app.use(notFound)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
})