const { saveFile } = require('../../utils/operations/file.opr')


module.exports = (app) => {
    const {
        constants:{ APP:{ UPLOAD_DIR } },
        api: { repositories: { dbfakeRepository } }
    } = app

    
    //  SERVICES:
    const get = async (collection, page, query, columns=[])=>{
        console.log('DBfakeService::get ...', collection, page, query, columns )

        return dbfakeRepository.find(collection)
            .then((users=[])=>({ error:false, status:200, message:"Lista de itens.", data:users }))
            .catch(({})=>({ error:true, status:500, message:"Erro ao buscar lista.", data:null }))
    }

    const getById = async (collection, id, columns=[])=>{
        console.log('DBfakeService::getById ...', collection, id, columns )

        return dbfakeRepository.findById(collection, id)
            .then((field)=>{
                if( field ){ return { error:false, status:200, message:"Item encontrado.", data:field } }
                return { error:true, status:400, message:"O item não existe.", data:null }
            })
            .catch(()=>({ error:true, status:500, message:"Erro, na busca do usuário.", data:null }))
    }

    const save = async (collection, field)=>{
        console.log('DBfakeService::save ...', collection, field)

        return dbfakeRepository.save(collection, field)
            .then(()=>({ error:false, status:200, message:"Salvo com sucesso." }))
            .catch(()=>({ error:true, status:500, message:"Erro ao salvar."}))
    }

    const update = async (collection, id, field)=>{ 
        console.log('DBfakeService::update ...', collection, id, field )

        const userFound = await dbfakeRepository.findById(collection, id)
        if( !userFound ){ return { error:true, status:400, message:"O item não existe." } }

        return dbfakeRepository.update(collection, id, field)
            .then(()=>({ error:false, status:200, message:"Atualizado com sucesso." }))
            .catch(()=>({ error:true, status:500, message:"Erro na atualização." }))
    }

    const remove = async (collection, id)=>{
        console.log('DBfakeService::remove ...', collection, id)
        
        const userFound = await dbfakeRepository.findById(collection, id)
        if( !userFound ){ return { error:true, status:400, message:"Item não existe." } }

        return dbfakeRepository.remove(collection, id)
            .then(() =>({ error:false, status:200, message:"Excluído com sucesso." }))
            .catch(()=>({ error:true, status:500, message:"Erro na exclusão."}))
    }
    


    return {
        get,
        getById,
        save,
        update,
        remove,
    }
}