const { saveFile } = require('../../utils/operations/file.opr')


module.exports = (app) => {
    const {
        constants:{ APP:{ UPLOAD_DIR } },
        api: { repositories: { apiRepository } }
    } = app

    
    //  SERVICES:
    const get = async (page, query, columns=[])=>{
        console.log('ApiService::get ...', page, query, columns )
        const queryCheck = (Object.keys(query).length===0) ? { id:1 }: query

        return apiRepository.find(queryCheck, columns)
            .then(resp =>({ error:false, status:200, message:"API ONLINE.", data:resp.api }))
            .catch(err  =>({ error:true, status:500, message:"Erro, API.", data:null }))
    }

    const getById = async (id, columns=[])=>{
        console.log('ApiService::getById ...', id, columns )

        return apiRepository.findById(id, columns)
            .then(resp =>({ error:false, status:200, message:"API ONLINE.", data:resp.api }))
            .catch(err  =>({ error:true, status:500, message:"Erro, API.", data:null }))
    }

    const save = async (api)=>{
        console.log('ApiService::save ...', api)

        return apiRepository.save(api)
            .then(resp =>({ error:false, status:200, message:"API ONLINE.", data:resp.api }))
            .catch(err  =>({ error:true, status:500, message:"Erro, API.", data:null }))
    }

    const update = async (id, api)=>{
        console.log('ApiService::update ...', id, api )

        return apiRepository.update(id, api)
            .then(resp =>({ error:false, status:200, message:"API ONLINE.", data:resp.api }))
            .catch(err  =>({ error:true, status:500, message:"Erro, API.", data:null }))
    }

    const remove = async (id)=>{
        console.log('ApiService::remove ...', id)

        return apiRepository.remove(id)
            .then(resp =>({ error:false, status:200, message:"API ONLINE.", data:resp.api }))
            .catch(err  =>({ error:true, status:500, message:"Erro, API.", data:null }))
    }

    const upload = async (files, info, headers)=>{
        console.log('ApiService::upload ...', files, info)

        //SALVAR ARQUIVO FISICAMENTE:
        const fileErros = []
        for await (const file of Object.values(files)) {
            const error = saveFile(file, UPLOAD_DIR).then(r=>r.error).catch(e=>e.error) 
            fileErros.push(error)    
        }
        if( fileErros.includes(true) ){ return { error:true, message:"Error no upload do(s) arquivo(s)." } }
        
        return { error:false, status:200, message:"Upload concluído." }
        
    }


    return {
        get,
        getById,
        save,
        update,
        remove,
        upload,
    }
}