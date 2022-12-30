module.exports = (app) => {
    const {
        api: { controllers: { dbfakeController } }
    } = app

    //  ROUTES:
    app.route('/api/fk/:collection')
        .get(dbfakeController.get)
        .post(dbfakeController.save)
        
    app.route('/api/fk/:collection/:id')
        .get(dbfakeController.getById)
        .put(dbfakeController.update)
        .delete(dbfakeController.remove)
}