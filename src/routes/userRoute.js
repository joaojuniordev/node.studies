module.exports = (app) => {
    const {
        api: { controllers: { userMgController, userKxController } }
    } = app

    //  ROUTES:
    
    
    // MONGODB: INITIAL
    app.route('/api/usuario-mg')
        .get(userMgController.get)
        .post(userMgController.save)
        
    app.route('/api/usuario-mg/:id')
        .get(userMgController.getById)
        .put(userMgController.update)
        .delete(userMgController.remove)
    
    // KNEX: DEFAULT
    app.route('/api/usuario')
        .get(userKxController.get)
        .post(userKxController.save)
        
    app.route('/api/usuario/:id')
        .get(userKxController.getById)
        .put(userKxController.update)
        .delete(userKxController.remove)
    
}