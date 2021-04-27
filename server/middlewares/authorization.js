const {Task} = require('../models');
const authorize = (req, res, next) =>{
    console.log(req.params.id)
    Task.findByPk(+req.params.id)
        .then(task => {
            const isTaskUser = task.UserId === req.currentUser.id
            if(isTaskUser){
                next();
            } else {
                next({
                    code: 401,
                    message: 'This Task is Not Yours'
                });
            }
        })
        .catch(err => {
            next({
                code: 500,
                message: 'failed reach server to create data'
            })
        })
}

module.exports = authorize