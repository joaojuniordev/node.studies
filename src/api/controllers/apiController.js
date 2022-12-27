module.exports = (app) => {
    const {
        api: { services: { apiService } }
    } = app

    //  CTRLLS:
    const get = async(req, res)=>{
        console.log('ApiCTRLL::get ... ')
        const { pag=1, colunas, ...query } = req.query
        const columns = colunas?.split('+')

        apiService.get(pag, query, columns)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const getById = async(req, res)=>{
        console.log('ApiCTRLL::getById ... ')
        const { id }  = req.params
        const columns = req.query.colunas?.split('+')

        apiService.getById(id, columns)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const save = async(req, res)=>{
        console.log('ApiCTRLL::save ... ')
        const api  = req.body

        apiService.save(api)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const update = async(req, res)=>{
        console.log('ApiCTRLL::update ... ')
        const { id } = req.params
        const api    = req.body

        apiService.update(id, api)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const remove = async(req, res)=>{
        console.log('ApiCTRLL::remvoe ... ')
        const { id }  = req.params

        apiService.remove(id)
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