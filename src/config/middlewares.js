/**
 * @CONFIG
 * @MIDDLEAWARES Contem todos os middlewares, de libs e autorais, para app.
 *               Local apropriado para adicionar os novos middlewares.
*/

const middlewares = require('../middlewares')


/**
 * @param {*} app 
*/
module.exports = (app)=>{

    // USE MWs: []
    const mws = middlewares(app)    
    app.use(mws)
    
    console.log('CONFIG::middlewares: mws =', mws)
    return true
}