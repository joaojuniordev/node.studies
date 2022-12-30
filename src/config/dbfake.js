let dbfake = require('../constants/dbRam')


module.exports = (app)=>{
    const { DBFAKE } = app.constants
    
    try {
        const dbjson = require(`../../storage/source/${DBFAKE.NAME}`)
        if(DBFAKE.ACTIVATED_JSON){ dbfake = dbjson }
        // console.log('CONFIG::dbjson ...', dbjson)
    } catch (e) {
        console.log(`CONFIG::dbfake: [Error: ${DBFAKE.NAME}] CHANGED -> dbRam`,)
    }

    app.dbfake = dbfake

    console.log('CONFIG::DBFAKE ...', DBFAKE)
    // console.log('CONFIG::app.dbfake ...', app.dbfake)
    return true
}