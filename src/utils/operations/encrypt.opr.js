const bcrypt = require('bcrypt-nodejs')

const hashEncrypt = (passwd, salt=10) =>{
    const SALT =  bcrypt.genSaltSync(salt)
    return bcrypt.hashSync(passwd, SALT)
}

module.exports = {

    hashEncrypt

}