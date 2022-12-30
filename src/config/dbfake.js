const dbRam  = require('../constants/dbRam')
const dbJson = require('../../storage/db.json')


module.exports = (app)=>{
    const { DBFAKE } = app.constants
    
    app.dbfake = DBFAKE.ACTIVATED_JSON ? dbJson : dbRam
    
    console.log('CONFIG::DBFAKE ...', DBFAKE)
    // console.log('CONFIG::app.dbfake ...', app.dbfake)
    return true
}