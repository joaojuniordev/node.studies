const { saveFile } = require('../../utils/operations/file.opr')


module.exports = (app) => {
    const {
        constants:{ APP:{ UPLOAD_DIR } },
        api: { repositories: { ramRepository } }
    } = app

    
    //  SERVICES:
    const get = async (page, query, columns=[])=>{
        console.log('RamService::get ...', page, query, columns )

        return ramRepository.find('users')
            .then((users)=>({ error:false, status:200, message:"Lista de usuários.", data:users }))
            .catch(({})=>({ error:true, status:500, message:"Erro ao buscar lista de usuários.", data:null }))
    }

    const getById = async (id, columns=[])=>{
        console.log('RamService::getById ...', id, columns )

        return ramRepository.findById('users', id)
            .then((user)=>{
                if( user ){ return { error:false, status:200, message:"Usuário.", data:user } }
                return { error:true, status:400, message:"Usuário não existe.", data:null }
            })
            .catch(()=>({ error:true, status:500, message:"Erro, na busca do usuário.", data:null }))
    }

    const save = async (user)=>{
        console.log('RamService::save ...', user)

        return ramRepository.save('users', user)
            .then((doc)=>({ error:false, status:200, message:"Usuário salvo com sucesso.", data:doc }))
            .catch(()=>({ error:true, status:500, message:"Erro, ao salvar o usuário."}))
    }

    const update = async (id, user)=>{ 
        console.log('RamService::update ...', id, user )

        const userFound = await ramRepository.findById('users', id)
        if( !userFound ){ return { error:true, status:400, message:"Usuário não existe." } }

        return ramRepository.update('users', id, user)
            .then(()=>({ error:false, status:200, message:"Usuário atualizado com sucesso." }))
            .catch(()=>({ error:true, status:500, message:"Erro na atualização do usuário." }))
    }

    const remove = async (id)=>{
        console.log('RamService::remove ...', id)
        
        const userFound = await ramRepository.findById('users', id)
        if( !userFound ){ return { error:true, status:400, message:"Usuário não existe." } }

        return ramRepository.remove('users', id)
            .then((doc) =>({ error:false, status:200, message:"Usuário excluído com sucesso.", data:doc }))
            .catch(()=>({ error:true, status:500, message:"Erro ao excluír usuário."}))
    }

    const upload = async (files={}, info, headers)=>{
        console.log('RamService::upload ...', files, info)

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