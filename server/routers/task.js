const Controller = require('../controllers');
const authorize = require('../middlewares/authorization');
const router = require('express').Router();

router.get('/tasks', Controller.viewAllTask);

router.get('/categories', Controller.viewCategory);

router.post('/tasks/:id', Controller.createtask);

router.use('/tasks/:id', authorize);

router.get('/tasks/:id', Controller.viewTask);

router.put('/tasks/:id', Controller.updateTitle);

router.patch('/tasks/:id', Controller.updateCategory);

router.delete('/tasks/:id', Controller.deleteTask);

module.exports = router