const { mkDirIfNoExist } = require('../utils/operations/dir.opr')
const encryptions = require('../utils/encryptions')
const validations = require('../utils/validations')
const queries     = require('../constants/queries')
const token       = require('../utils/operations/token.opr')


module.exports = (app)=>{
    const {  } = app.constants
    console.log('Loaders:: ### ...', )
    
    // MAKE IMPORTANT FOLDERS:
    mkDirIfNoExist('./storage/source').then(console.log).catch(e=>e)
    mkDirIfNoExist('./storage/value').then(console.log).catch(e=>e)
    mkDirIfNoExist('./storage/value/register').then(console.log).catch(e=>e)
    
    // VERIFICATION:
    app.db = (app.db) ? app.db : {}

    // SET VARS AND METHODS TO THE APP:
    app.encryptions = encryptions
    app.validations = validations
    app.db.queries  = queries
    app.token       = token

    return true
}