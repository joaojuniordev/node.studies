module.exports = (app) => {
    const {
        api: {
            services:{ apiService },
            repositories: { userRepository } 
        }
    } = app


    //  SERVICES:
    const get = async (page, query, columns=['-passwd','-__v'])=>{
        console.log('UserService::get ...', page, query, columns )

        return userRepository.find(query, columns)
            .then(({users})=>({ error:false, status:200, message:"Lista de usuários.", data:users }))
            .catch(({users})=>({ error:true, status:500, message:"Erro na lista de usuários.", data:users }))
    }

    const getById = async (id, columns=['-passwd','-__v'])=>{
        console.log('UserService::getById ...', id, columns )

        return userRepository.findById(id, columns)
            .then(({user})=>({ error:false, status:200, message:"Usuário encontrado.", data:user }))
            .catch(({user})=>({ error:true, status:500, message:"Usuário não existe.", data:user }))
    }

    const save = async (user, files, headers)=>{
        console.log('UserService::save ...', user, files)

        const { user:svUser } = await userRepository.save(user)
        if( !svUser ){ return { error:true, status:500, message:"Erro ao salvar o usuário." }}
        
        //SALVAR ARQUIVO FISICAMENTE:
        const fileErros = await apiService.upload(files, {}, headers)
        if( fileErros.error ){ return { error:true, message:"Error ao salvar arquivo(s) do usuário." } }
        
        return { error:false, status:200, message:"Usuário salvo com sucesso."}
    }

    const update = async (id, user)=>{
        console.log('UserService::update ...', id, user )

        return userRepository.findByIdAndUpdate(id, user)
            .then(({user:upUser})=>{
                if(upUser===null){ return { error:true, status:400, message:"Usuário não existe." } }
                return { error:false, status:200, message:"Usuário aualizado com sucesso." }
            })
            .catch(({user})=>({ error:true, status:500, message:"Erro na atualização do usuário." }))
    }

    const remove = async (id)=>{
        console.log('UserService::remove ...', id)

        return userRepository.remove(id)
            .then(()=>({ error:false, status:200, message:"Usuário excluído com sucesso." }))
            .catch(()=>({ error:true, status:500, message:"Erro ao exluir usuário." }))
    }


    return {
        get,
        getById,
        save,
        update,
        remove,
    }
}