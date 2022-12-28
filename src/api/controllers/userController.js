module.exports = (app) => {
    const {
        api: { services: { userService } }
    } = app

    //  CTRLLS:
    const get = async(req, res)=>{
        console.log('UserCTRLL::get ... ')
        const { pag=1, colunas, ...query } = req.query
        const columns = colunas?.split('+')

        userService.get(pag, query, columns)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const getById = async(req, res)=>{
        console.log('UserCTRLL::getById ... ')
        const { id }  = req.params
        const columns = req.query.colunas?.split('+')

        userService.getById(id, columns)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const save = async(req, res)=>{
        console.log('UserCTRLL::save ... ')
        const user  = req.body

        userService.save(user)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const update = async(req, res)=>{
        console.log('UserCTRLL::update ... ')
        const { id } = req.params
        const user    = req.body

        userService.update(id, user)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const remove = async(req, res)=>{
        console.log('UserCTRLL::remvoe ... ')
        const { id }  = req.params

        userService.remove(id)
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