const { saveFile } = require('../../utils/operations/file.opr')


module.exports = (app) => {
    const {
        constants:{ APP:{ UPLOAD_DIR } },
        // api: { repositories: { apiRepository } }
    } = app

    
    //  SERVICES:

    const upload = async (files={}, info, headers)=>{
        console.log('ApiService::upload ...', files, info)

        //SALVAR ARQUIVO FISICAMENTE:
        const fileErros = []
        for await (const file of Object.values(files)) {
            const error = saveFile(UPLOAD_DIR, file).then(r=>r.error).catch(e=>e.error) 
            fileErros.push(error)    
        }
        if( fileErros.includes(true) ){ return { error:true, message:"Error no upload do(s) arquivo(s)." } }
        
        return { error:false, status:200, message:"Upload concluído." }
        
    }


    return {
        upload,
    }
}