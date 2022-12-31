module.exports = (app)=>{
    const {
        // api:{ models:{  } }
    } = app


    const find = async(query={}, columns=[])=>{
        console.log('   ApiRepository::find ...', query, columns)
        
        return { error:true, message:err, api:[] }
    }

    const findById = async(id, columns=[])=>{
        console.log('   ApiRepository::findById ...', id, columns)
        
        return { error:true, message:err, api:[] }
    }

    const save = async(api)=>{
        console.log('   ApiRepository::save ...', api)
        
        return { error:true, message:err, api:[] }
    }
    
    const update = async(id, api={})=>{
        console.log('   ApiRepository::update ...', id, api)
        
        return { error:true, message:err, api:[] }
    }

    const remove = async(id)=>{
        console.log('   ApiRepository::remove ...', id)
        
        return { error:true, message:err, api:[] }
    }


    return {
        find,
        findById,
        save,
        update,
        remove,
    }
}