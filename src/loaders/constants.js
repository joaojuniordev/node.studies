/**
 * @CONFIG
 * @VARIABLE  Este módulo exporta as VAR/CONST de configurações:
 * @ENV       Nao utilizar process.env.VAR dentro do projeto.
 * @VANTAGEM  Se remonear uma constante do .env, nao precisa-la procura em todo o projeto para alter-la, basta corrigir aqui.
*/

const dotenv = require('dotenv')
// CARREGAR O .env NO process.env:
dotenv.config({ path: '.env.jjr.dev' })
// dotenv.config({ path: '.env' })

const CONSTS = require('../constants')


module.exports = (app) => {
    // SET CONSTS TO THE APP:
    app.constants = CONSTS
    
    // console.log('CONFIG::app.constants ...', Object.keys(app.constants))
    return true
}