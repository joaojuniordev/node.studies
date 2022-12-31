module.exports = (app) => {
    const {
        api: { controllers: { apiController } }
    } = app

    //  ROUTES:        
    app.route('/api/upload')
        .post(apiController.upload)    

}