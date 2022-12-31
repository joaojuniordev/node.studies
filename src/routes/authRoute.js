module.exports = (app) => {
    const {
        config:{ passport:{ auth } },
        api:{ controllers:{ authController, userKxController } }
    } = app

    // ROUTES:
    app.post('/api/cadastro', userKxController.save)
    app.post('/api/entrar', authController.signin)
    app.post('/api/validar-token', authController.validateToken)
    // app.post('/sair', auth(), authController.signout)
    
}
