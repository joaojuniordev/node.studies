module.exports = (app) => {
    const {
        api: {
            services:{ apiService },
            repositories: { userMgRepository } 
        }
    } = app


    //  SERVICES:
    const get = async (page, query, columns=['-passwd','-__v'])=>{
        console.log('UserMgService::get ...', page, query, columns )

        return userMgRepository.find(query, columns)
            .then(({users})=>({ error:false, status:200, message:"Lista de usuários.", data:users }))
            .catch(({users})=>({ error:true, status:500, message:"Erro na lista de usuários.", data:users }))
    }

    const getById = async (id, columns=['-passwd','-__v'])=>{
        console.log('UserMgService::getById ...', id, columns )

        return userMgRepository.findById(id, columns)
            .then(({user})=>({ error:false, status:200, message:"Usuário encontrado.", data:user }))
            .catch(({user})=>({ error:true, status:500, message:"Usuário não existe.", data:user }))
    }

    const save = async (user, files, headers)=>{
        console.log('UserMgService::save ...', user, files)
        if( user.passwd!==user.confirmPasswd ){ return { error:true, status:500, message:"Senhas diferentes." }}
        delete user.confirmPasswd
        
        const { user:svUser } = await userMgRepository.save(user)
        if( !svUser ){ return { error:true, status:500, message:"Erro ao salvar o usuário." }}
        
        //SALVAR ARQUIVO FISICAMENTE:
        const fileErros = await apiService.upload(files, {}, headers)
        if( fileErros.error ){ return { error:true, message:"Error ao salvar arquivo(s) do usuário." } }
        
        return { error:false, status:200, message:"Usuário salvo com sucesso."}
    }

    const update = async (id, user)=>{
        console.log('UserMgService::update ...', id, user )

        return userMgRepository.findByIdAndUpdate(id, user)
            .then(({user:upUser})=>{
                if(upUser===null){ return { error:true, status:400, message:"Usuário não existe." } }
                return { error:false, status:200, message:"Usuário aualizado com sucesso." }
            })
            .catch(({user})=>({ error:true, status:500, message:"Erro na atualização do usuário." }))
    }

    const remove = async (id)=>{
        console.log('UserMgService::remove ...', id)

        return userMgRepository.remove(id)
            .then(({user})=>{
                if( !user ){ return { error:true, status:400, message:"Usuário não existe." } }
                return { error:false, status:200, message:"Usuário excluído com sucesso." }
            })
            .catch(({})=>({ error:true, status:500, message:"Erro ao exluir usuário." }))
    }


    return {
        get,
        getById,
        save,
        update,
        remove,
    }
}