import express from 'express';
export const usersRouter = express.Router();

import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite')

usersRouter.post('/', (req, res, next) => {
    const id = null;
    const username = req.body.user.username;
    const password = req.body.user.password;
    const email = req.body.user.email;
    if(!username || !password ) {
        return res.sendStatus(400);
    } 
   const sql = 'INSERT INTO Users (id, username, password, email) ' + 
                ` VALUES ($id,$username, $password, $email)`;
   const values = {
       $id: id,
       $username: username,
       $password: password,
       $email: email       
   }
   
   db.run(sql, values, (error) => {
       if(error) {
           next(error);
       } else {
            req.session.user = 'demo';
            console.log('from signup: ' + JSON.stringify(req.session));
            res.status(200).json({userName: req.session.user});
       }
   })

})

usersRouter.post('/login', (req, res, next) => {
    let username = req.body.user.username;
    let password = req.body.user.password;

    let sql = 'SELECT * FROM Users WHERE Users.username = $username AND Users.password = $password'
    let values = {$username: username, $password: password};
    db.get(sql, values, (error, user) => {
        if(error) {
            next(error);
        } else if (user) {
            req.session.user = username;
            console.log('from login:' + JSON.stringify(req.session.user));
            res.status(200).json({user: user})
        } else {
            res.status(404).send('unable to log in');
        }
    })
})

usersRouter.get('/logout', (req, res) => {
    delete req.session.user;
    res.json(true);
})
