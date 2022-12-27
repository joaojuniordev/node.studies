module.exports = (app)=>{
    const {
        api:{ models:{ apiModel } }
    } = app


    const find = async(query={}, columns=[])=>{
        console.log('   ApiRepository::find ...', query, columns)
        
        return apiModel.find(query)
            .then(api=>({ error:false, api }))
            .catch(err=>({ error:true, message:err, api:[] }))    
    }

    const findById = async(id, columns=[])=>{
        console.log('   ApiRepository::findById ...', id, columns)
        
        return apiModel.findById(id)
            .then(api=>({ error:false, api }))
            .catch(err=>({ error:true, message:err, api:[] }))    
    }

    const save = async(api)=>{
        console.log('   ApiRepository::save ...', api)
        
        return apiModel.save(api)
            .then(api=>({ error:false, api }))
            .catch(err=>({ error:true, message:err, api:[] }))    
    }
    
    const update = async(id, api={})=>{
        console.log('   ApiRepository::update ...', id, api)
        
        return apiModel.update(id, api)
            .then(api=>({ error:false, api }))
            .catch(err=>({ error:true, message:err, api:[] }))    
    }

    const remove = async(id)=>{
        console.log('   ApiRepository::remove ...', id)
        
        return apiModel.remove(id)
            .then(api=>({ error:false, api }))
            .catch(err=>({ error:true, message:err, api:[] }))    
    }


    return {
        find,
        findById,
        save,
        update,
        remove,
    }
}