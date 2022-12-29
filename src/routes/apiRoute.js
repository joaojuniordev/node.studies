module.exports = (app) => {
    const {
        api: { controllers: { apiController } }
    } = app

    //  ROUTES:
    app.route('/api/test')
        .get(apiController.get)
        .post(apiController.save)
        
    app.route('/api/test/:id')
        .get(apiController.getById)
        .put(apiController.update)
        .delete(apiController.remove)
    
    app.route('/api/upload')
        .post(apiController.upload)    

}