module.exports = (app) => {
    const {
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

    return {
        get,
        getById,
        save,
        update,
        remove,
    }
}