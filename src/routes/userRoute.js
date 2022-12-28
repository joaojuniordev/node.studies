module.exports = (app) => {
    const {
        api: { controllers: { userController } }
    } = app

    //  ROUTES:
    app.route('/api/usuario')
        .get(userController.get)
        .post(userController.save)
        
    app.route('/api/usuario/:id')
        .get(userController.getById)
        .put(userController.update)
        .delete(userController.remove)
        

}