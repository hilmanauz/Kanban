const bcrypt = require('bcryptjs');

const hashPassword = password => {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}

module.exports = {hashPassword, comparePassword}