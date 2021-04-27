const {User, Task, Category} = require("../models");
const {comparePassword} = require("../helpers/hashPassword");
const {access_token} = require("../helpers/jwt");
const {OAuth2Client} = require('google-auth-library');


class Controller {
    static register(req, res, next){
        const input = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        }
        User.create(input)
            .then((user) => {
                res.status(201).json({message: "Success create User", user});
            })
            .catch((err) => {
                next(err)
            })
    }

    static login(req, res, next){
        let email = req.body.email;
        let password = req.body.password;
        User.findOne({where : {email: email}})
            .then((user) => {
                if(user){
                    let isUser = comparePassword(password, user.password);
                    if (isUser){
                        let token = access_token({id: user.id, email: user.email});
                        res.status(200).json({access_token: token, name:user.username, email:user.email})
                    } else {
                        next({
                            code: 401,
                            message: 'invalid username or password'
                        });
                    }
                } else {
                    next({
                        code: 401,
                        message: 'invalid username or password'
                    });
                }
            })
            .catch((err)=>{
                next(err)
            })
    }

    static viewAllTask(req, res, next){
        Category.findAll({include: [{model: Task, include: [{model: User}]}]})
            .then((tasks) => {
                res.status(200).json(tasks);
            })
            .catch(err => {
                next({
                    code: 500,
                    message: 'failed reach server to create data'
                })
            })
    }

    static viewTask(req, res, next){
        Task.findByPk(req.params.id)
            .then(task => {
                res.status(200).json(task);
            })
            .catch(err => {
                next({
                    code: 500,
                    message: 'failed reach server to create data'
                })
            })
    }

    static viewCategory(req, res, next){
        Category.findAll()
            .then(categories => {
                res.status(200).json(categories);
            })
            .catch(err => {
                next({
                    code: 500,
                    message: 'failed reach server to create data'
                })
            })
    }

    static createtask(req, res, next){
        const data = {
            title: req.body.title,
            UserId: req.currentUser.id,
            CategoryId: req.params.id
        }
        Task.create(data)
            .then((task) => {
                res.status(201).json(task);
            })
            .catch(err => {
                next({
                    code: 500,
                    message: 'failed reach server to create data'
                })
            })
    }

    static updateTitle(req, res, next){
        const title = {
            title: req.body.title
        }
        Task.update(title, {where: {id: req.params.id}})
            .then(task => {
                res.status(200).json(task);
            })
            .catch(err => {
                next({
                    code: 500,
                    message: 'failed reach server to create data'
                })
            })
    }

    static updateCategory(req, res, next){
        const category = {
            CategoryId: req.body.categoryId
        }
        Task.update(category, {where: {id: req.params.id}})
            .then(task => {
                res.status(200).json(task);
            })
            .catch(err => {
                next({
                    code: 500,
                    message: 'failed reach server to create data'
                })
            })
    }

    static deleteTask(req, res, next){
        Task.destroy({where: {id: req.params.id}})
            .then(task => {
                res.status(200).json({message: 'Task success to delete'});
            })
            .catch(err => {
                next({
                    code: 500,
                    message: 'failed reach server to create data'
                })
            })
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        async function verify(){
            const ticket = await client.verifyIdToken({
                idToken: req.body.access_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const googleUserParams = ticket.getPayload()
            User.findOrCreate({
                where: {
                    email: googleUserParams.email
                },
                defaults: {
                    password: (new Date()).toDateString(),
                    username: googleUserParams.name,
                }
            })
            .then(user => {
                let data = user[0];
                let payload = {id: data.id, email: data.email}
                res.status(200).json({
                    name: data.username,
                    email: data.email,
                    access_token: access_token(payload),
                })
            })
        }
        verify().catch(console.error)
    }



}

module.exports = Controller