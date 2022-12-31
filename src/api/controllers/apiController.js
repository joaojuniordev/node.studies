module.exports = (app) => {
    const {
        api: { services: { apiService } }
    } = app

    //  CTRLLS:
    const upload = async(req, res)=>{
        console.log('UserCTRLL::upload ... Multiform', req.body)
        const { info } = req.body
        const { files, headers } = req

        apiService.upload(files, info, headers)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    } 



    return {
        upload,
    }

}