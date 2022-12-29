/**
 * @MIDDLEAWARES Contem todos os middlewares, de libs e autorais, para app.
 *               Local apropriado para adicionar os novos middlewares.
*/

// IMPORTS MW AUTORAIS:
const authorial  = require('../utils/middlewares')

// IMPORTS MW LIBS:
const bodyParser = require('body-parser')
const cors       = require('cors')
const connectBusboy     = require('connect-busboy')
const busboyBodyParser  = require('busboy-body-parser')


/**
 * @param {*} app 
*/
module.exports = (app)=>{
    const authorialMW = authorial(app)

    // ADD MW FROM LIBS:
    const add_mws = [

        bodyParser.text(),
        // app.express.urlencoded({ extended: true }),
        bodyParser.urlencoded({ extended: true }),
        // app.express.json(),
        bodyParser.json(),
        // bodyParser.json({ type: 'application/json'}),
        cors(),
        connectBusboy(),
        busboyBodyParser(),

    ]

    console.log('   MW:: ...', authorialMW)
    // DON'T CHANGE IF YOU DON'T KNOW WHAT YOU'RE DOING:
    return [
        ...add_mws,        
        // MUST BE LAST: (because of the json SyntaxError)
        ...authorialMW,
    ]
}