const express = require('express');
const user = express.Router();
const DB = require('../config/database')

user.post('/', async(req, res, next) => {
    const { user_name, user_mail, user_password} = req.body;
    if (user_name && user_mail && user_password ) {
        let query = "INSERT INTO users(user_name, user_mail, user_password)"
        query += ` VALUES('${user_name}', '${user_mail}', '${user_password}')`

        const rows = await DB.query(query)

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario insertado correctamente"});
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({ code: 500, message: "Capos incompletos"});
})

user.get('/', async(req, res, next) => {
    const consult = await DB.query("SELECT * FROM users");
    return res.status(200).json({ code: 200, message: consult});
})

module.exports = user;