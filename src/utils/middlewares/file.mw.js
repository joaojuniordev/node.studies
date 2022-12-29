const { saveFile } = require('../../utils/operations/file.opr')

module.exports = (app)=>{
    const { 
        constants:{ APP:{ UPLOAD_DIR, AUTO_SAVEFILE } } 
    } = app
    // console.log('   FileMW:: ... ', UPLOAD_DIR)


    const saveFileMW = async (req, res, next) => {
        if(AUTO_SAVEFILE){
            console.log('   FileMW::SaveFileMW:: ### ...')

            const { files={} } = req

            // SAVE FILES:       
            for await (const file of Object.values(files)) { 
                saveFile(file, UPLOAD_DIR)
                    .then(f=>console.log('  FileMW::SaveFileMW: SAVE_FILE =', f))
                    .catch(e=>console.log(' FileMW::SaveFileMW: ERROR_FILE =', e))
            }
        }

        next()
    }



    return [
        saveFileMW,
    ]
}