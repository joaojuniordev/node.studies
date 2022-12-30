const { mkDirIfNoExist } = require('../utils/operations/dir.opr')


module.exports = (app)=>{
    const { DBFAKE } = app.constants
    console.log('Loaders:: ### ...', )
    
    // MAKE IMPORTANT FOLDERS:
    mkDirIfNoExist('./storage/source').then(console.log).catch(e=>e)
    

    return true
}