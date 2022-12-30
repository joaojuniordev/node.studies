module.exports = (app) => {
    const {
        api: { services: { dbfakeService } }
    } = app

    //  CTRLLS:
    const get = async(req, res)=>{
        console.log('DBfakeCTRLL::get ... ')
        const { collection='' } = req.params
        const { pag=1, colunas, ...query } = req.query
        const columns = colunas?.split('+')

        dbfakeService.get(collection, pag, query, columns)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const getById = async(req, res)=>{
        console.log('DBfakeCTRLL::getById ... ')
        const { collection ,id }  = req.params
        const columns = req.query.colunas?.split('+')

        dbfakeService.getById(collection , id, columns)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const save = async(req, res)=>{
        console.log('DBfakeCTRLL::save ... ')
        const { collection='' } = req.params
        const document  = req.body

        dbfakeService.save(collection, document)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const update = async(req, res)=>{
        console.log('DBfakeCTRLL::update ... ')
        const { collection, id } = req.params
        const document    = req.body

        dbfakeService.update(collection, id, document)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const remove = async(req, res)=>{
        console.log('DBfakeCTRLL::remove ... ')
        const { collection, id }  = req.params

        dbfakeService.remove(collection, id)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  



    return {
        get,
        getById,        
        save,
        update,
        remove,
    }

}