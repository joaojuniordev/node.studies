module.exports = (app) => {
    const {
        config:{ passport:{ auth } },
        api: { controllers: { userMgController, userKxController } }
    } = app

    //  ROUTES:
    
    
    // MONGODB: INITIAL
    app.route('/api/usuario-mg').all(auth())
        .get(userMgController.get)
        .post(userMgController.save)
        
    app.route('/api/usuario-mg/:id').all(auth())
        .get(userMgController.getById)
        .put(userMgController.update)
        .delete(userMgController.remove)
    
    // KNEX: DEFAULT
    app.route('/api/usuario').all(auth())
        .get(userKxController.get)
        .post(userKxController.save)
        
    app.route('/api/usuario/:id').all(auth())
        .get(userKxController.getById)
        .put(userKxController.update)
        .delete(userKxController.remove)
    
}