module.exports = (app)=>{
    

    const find = async ()=>{
        console.log('ApiMode::find ')
        return app.dbRam
    }

    const findById = async (id)=>{
        console.log('ApiMode::findById ', id)
        return app.dbRam[id]
    }

    const save = async (api)=>{
        console.log('ApiMode::save ', api)
        const id = app.dbRam.length
        delete api.id
        app.dbRam.push({ id, ...api })
        return app.dbRam
    }
    
    const update = async (id, api)=>{
        console.log('ApiMode::update ', id, api)
        app.dbRam[id] = { id, ...api }
        return app.dbRam[id]
        
    }

    const remove = async (id)=>{
        console.log('ApiMode::remove ', id)
        delete app.dbRam[id]
        return app.dbRam
    }

    return {
        find,
        findById, 
        save,
        update,
        remove,
    }

}