const { mkDirIfNoExist } = require('../utils/operations/dir.opr')
const queries     = require('../constants/queries')
const validations = require('../utils/validations')
const token       = require('../utils/operations/token.opr')
const encrypt     = require('../utils/operations/encrypt.opr')


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
    app.db.queries  = queries
    app.validations = validations
    app.token       = token
    app.encrypt     = encrypt

    return true
}