module.exports = (app) => {
    const {
        constants:{ SAFEROUTE:{ DBFAKE } },
        config:{ passport:{ authToggle } },
        api: { controllers: { dbfakeController } }
    } = app
    console.log('ROUTE::DBFAKE', DBFAKE)


    //  ROUTES:
    app.route('/api/fk/:collection').all(authToggle(DBFAKE))
        .get(dbfakeController.get)
        .post(dbfakeController.save)
        
    app.route('/api/fk/:collection/:id').all(authToggle(DBFAKE))
        .get(dbfakeController.getById)
        .put(dbfakeController.update)
        .delete(dbfakeController.remove)
}