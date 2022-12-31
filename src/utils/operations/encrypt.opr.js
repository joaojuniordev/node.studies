const bcrypt = require('bcrypt-nodejs')


/**
 * 
 * @param {*} passwd 
 * @param {*} salt 
 * @returns hash
 */
const hashEncrypt = (passwd, salt=10) =>{
    const SALT = bcrypt.genSaltSync(salt)
    return bcrypt.hashSync(passwd, SALT)
}

/**
 * 
 * @param {*} data 
 * @param {*} encryted hash 
 * @returns bool
 */
const compareSync = (data, encryted)=>{
    return bcrypt.compareSync(data, encryted)
}



module.exports = {

    hashEncrypt,
    compareSync,

}