const { saveFile } = require('../../utils/operations/file.opr')


module.exports = (app)=>{
    const { constants:{ DBFAKE } } = app
    console.log("   DBFAKE:: ... ", DBFAKE.ACTIVATED_JSON)

    // REPOS:
    const find = async (collention='')=>{
        console.log('JsonRepository::find ', collention)
        return app.dbfake[collention]
    }

    const findById = async (collention, id)=>{
        console.log('JsonRepository::findById ', collention, id,)
        return app.dbfake[collention]?.[id]
    }

    const save = async (collention, document)=>{
        console.log('JsonRepository::save ', collention)
        //CREATE ID:
        delete document.id
        const id = app.dbfake[collention]?.length ? app.dbfake[collention]?.length : 0
        // ADD RAM:
        if( app.dbfake[collention]===undefined ){ app.dbfake[collention] = [] }
        app.dbfake[collention].push({ id, ...document })
        // ADD JSON: true
        DBFAKE.ACTIVATED_JSON && await saveFile({ data:JSON.stringify(app.dbfake), name:DBFAKE.NAME }, DBFAKE.PATH)

        return app.dbfake[collention]
    }
    
    const update = async (collention, id, document)=>{
        console.log('JsonRepository::update ', collention, id )
        // UP RAM:
        app.dbfake[collention][id] = { id, ...document }
        // UP JSON: true
        DBFAKE.ACTIVATED_JSON && await saveFile({ data:JSON.stringify(app.dbfake), name:DBFAKE.NAME }, DBFAKE.PATH)
        
        return app.dbfake[collention]?.[id]
        
    }

    const remove = async (collention, id)=>{
        console.log('JsonRepository::remove ', collention, id)
        // DEL RAM:
        // delete app.dbfake[collention][id]// null
        app.dbfake[collention] = app.dbfake[collention].filter((doc)=>doc?.id != id)
        // DEL JSON: true
        DBFAKE.ACTIVATED_JSON && await saveFile({ data:JSON.stringify(app.dbfake), name:DBFAKE.NAME }, DBFAKE.PATH)

        return app.dbfake[collention]
    }


    
    return {
        find,
        findById, 
        save,
        update,
        remove,
    }

}