const router = require('express').Router();
const taskRouter = require("./task");
const Controller = require("../controllers");
const authenticate = require("../middlewares/authenticate");

router.post('/register', Controller.register);

router.post('/login', Controller.login);

router.post('/googleLogin', Controller.googleLogin);

router.use(authenticate);

router.use(taskRouter);

module.exports = router