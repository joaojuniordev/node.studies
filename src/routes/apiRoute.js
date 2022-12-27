module.exports = (app) => {
    const {
        api: { controllers: { apiController } }
    } = app

    //  ROUTES:
    app.route('/api')
        .get(apiController.get)
        .post(apiController.save)
        
    app.route('/api/:id')
        .get(apiController.getById)
        .put(apiController.update)
        .delete(apiController.remove)
        

}