const bcrypt = require('bcrypt-nodejs')


/**
 * 
 * @param {*} passwd 
 * @param {*} salt 
 * @returns hash
 */
const hashEncryption = (text, salt=10) =>{
    const SALT =  bcrypt.genSaltSync(salt)
    return bcrypt.hashSync(text, SALT)
}

/**
 * 
 * @param {*} data 
 * @param {*} encryted hash 
 * @returns bool
 */
const hashCompareSync = (data, encryted)=>{
    return bcrypt.compareSync(data, encryted)
}



module.exports = {
    hashCompareSync,
    hashEncryption
}