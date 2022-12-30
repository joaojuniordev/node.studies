module.exports = (app)=>{
    

    const find = async (collention='')=>{
        console.log('RamRepository::find ', collention)
        return app.dbRam[collention]
    }

    const findById = async (collention, id)=>{
        console.log('RamRepository::findById ', collention, id,)
        return app.dbRam[collention]?.[id]
    }

    const save = async (collention, document)=>{
        console.log('RamRepository::save ', collention)
        const id = app.dbRam[collention].length
        delete document.id
        app.dbRam[collention].push({ id, ...document })
        return app.dbRam[collention]
    }
    
    const update = async (collention, id, document)=>{
        console.log('RamRepository::update ', collention, id )
        app.dbRam[collention][id] = { id, ...document }
        return app.dbRam[collention][id]
        
    }

    const remove = async (collention, id)=>{
        console.log('RamRepository::remove ', collention, id)
        // delete app.dbRam[collention][id]// null
        app.dbRam[collention] = app.dbRam[collention].filter((doc)=>doc?.id != id)
        return app.dbRam[collention]
    }


    
    return {
        find,
        findById, 
        save,
        update,
        remove,
    }

}