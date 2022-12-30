module.exports = (app) => {
    const {
        api: { controllers: { ramController } }
    } = app

    //  ROUTES:
    app.route('/api/r/usuario')
        .get(ramController.get)
        .post(ramController.save)
        
    app.route('/api/r/usuario/:id')
        .get(ramController.getById)
        .put(ramController.update)
        .delete(ramController.remove)
    
}