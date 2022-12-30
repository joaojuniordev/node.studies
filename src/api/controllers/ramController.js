module.exports = (app) => {
    const {
        api: { services: { ramService } }
    } = app

    //  CTRLLS:
    const get = async(req, res)=>{
        console.log('ramCTRLL::get ... ')
        const { pag=1, colunas, ...query } = req.query
        const columns = colunas?.split('+')

        ramService.get(pag, query, columns)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const getById = async(req, res)=>{
        console.log('ramCTRLL::getById ... ')
        const { id }  = req.params
        const columns = req.query.colunas?.split('+')

        ramService.getById(id, columns)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const save = async(req, res)=>{
        console.log('ramCTRLL::save ... ')
        const document  = req.body

        ramService.save(document)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const update = async(req, res)=>{
        console.log('ramCTRLL::update ... ')
        const { id } = req.params
        const document    = req.body

        ramService.update(id, document)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const remove = async(req, res)=>{
        console.log('ramCTRLL::remove ... ')
        const { id }  = req.params

        ramService.remove(id)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }  

    const upload = async(req, res)=>{
        console.log('ramCTRLL::upload ... Multiform', req.body)
        const { info } = req.body
        const { files, headers } = req

        ramService.upload(files, info, headers)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    } 



    return {
        get,
        getById,        
        save,
        update,
        remove,
        upload,
    }

}