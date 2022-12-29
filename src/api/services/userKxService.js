module.exports = (app) => {
    const {
        api: {
            services:{ apiService },
            repositories: { userKxRepository } 
        }
    } = app


    //  SERVICES:
    const get = async (page, query, columns=['id','name','email','admin'])=>{
        console.log('UserKxService::get ...', page, query, columns )

        return userKxRepository.find(query, columns)
            .then(({users})=>({ error:false, status:200, message:"Lista de usuários.", data:users }))
            .catch(({users})=>({ error:true, status:500, message:"Erro na lista de usuários.", data:users }))
    }

    const getById = async (id, columns=[])=>{
        console.log('UserKxService:: getById ...', id)

        return userKxRepository.findById(id, columns)
            .then((resp) =>({ error:false, status:200, message:"Usuário.", data:resp?.user }))
            .catch(() =>({ error:true, status:500, message:"Erro ao buscar usuário.", data:null }))
    }

    const save = async (user, files, headers)=>{
        console.log('UserKxService::save ...', user, files)

        if( user.passwd!==user.confirmPasswd ){ return { error:true, status:500, message:"Senhas diferentes." }}
        delete user.confirmPasswd

        // SAVE DB:
        const svUser = await userKxRepository.save(user)
        // console.log('svUser ...', svUser)
        if( !svUser?.user ){ return { error:true, status:500, message:"Erro ao salvar o usuário.", ierror:svUser?.message } }

        //PUYSICALLY SALVE FILE:
        const fileErros = await apiService.upload(files, {}, headers)
        if( fileErros?.error ){ return { error:true, message:"Error ao salvar arquivo(s) do usuário." } }
        
        return { error:false, status:200, message:"Usuário salvo com sucesso."}
    }

    const update = async (id, user)=>{
        console.log('UserKxService::update ...', id, user )

        return userKxRepository.findByIdAndUpdate(id, user)
            .then(({user:upUser})=>{
                if(upUser===null){ return { error:true, status:400, message:"Usuário não existe." } }
                return { error:false, status:200, message:"Usuário aualizado com sucesso." }
            })
            .catch((e)=>({ error:true, status:500, message:"Erro na atualização do usuário.", e }))
    }

    const deleteSoft = async (id)=>{
        console.log('UserKxService::remove ...', id)

        return userKxRepository.update({ id },{ deletedAt:new Date() })
            .then(()=>({ error:false, status:200, message:"Usuário excluído com sucesso." }))
            .catch(()=>({ error:true, status:500, message:"Erro ao exluir usuário." }))
    }

    const remove = async (id)=>{
        console.log('UserKxService::remove ...', id)

        return userKxRepository.remove(id)
            .then(()=>({ error:false, status:200, message:"Usuário excluído com sucesso." }))
            .catch(()=>({ error:true, status:500, message:"Erro ao exluir usuário." }))
    }


    return {
        get,
        getById,
        save,
        update,
        deleteSoft,
        remove,
    }
}