const express = require('express');
const user = express.Router();
const DB = require('../config/database');
const jwt = require('jsonwebtoken');

user.post('/signin', async(req, res, next) => {
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

user.post('/login', async (req, res, next) => {
    const {user_mail, user_password} = req.body;
    
    if (user_mail && user_password ) {
        const query = `SELECT * FROM users WHERE user_mail = '${user_mail}' AND user_password = '${user_password}'`;

        const rows = await DB.query(query)

        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token});
        }
        return res.status(201).json({ code: 201, message: "Registro no encontrado"});
    }
    return res.status(500).json({ code: 500, message: "Capos incompletos"});
})

user.get('/', async(req, res, next) => {
    const consult = await DB.query("SELECT * FROM users");
    return res.status(200).json({ code: 200, message: consult});
})

module.exports = user;