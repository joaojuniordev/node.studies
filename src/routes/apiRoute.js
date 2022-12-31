module.exports = (app) => {
    const {
        config:{ passport:{ auth, authToggle } },
        api: { controllers: { apiController } }
    } = app

    //  ROUTES:        
    app.route('/api/upload').all(authToggle(false))
        .post(apiController.upload)    

}