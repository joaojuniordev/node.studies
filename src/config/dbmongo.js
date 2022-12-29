/**
 * @DATABASE Estabelece a CONEXÃO com o mongodb/database.
*/
const mongoose = require('mongoose')
mongoose.set("strictQuery", true)


module.exports = (app) =>{

    const { 
        MONGODB: { PROTOCOLO, SRV, HOST, PORT, DB_NAME, DB_USER, DB_PASS, PARAMS } 
    } = app?.constants
    
    const URI = `${PROTOCOLO}://${HOST}:${PORT}/${DB_NAME}${PARAMS}`
    // const URI = `${PROTOCOLO}${SRV}://${DB_USER}:${DB_PASS}@${HOST}/${DB_NAME}${PARAMS}`
    
    // mongoose.set('useNewUrlParser', true)
    // mongoose.set('useUnifiedTopology', true)
    // mongoose.set('useFindAndModify', false)
    // mongoose.set('useCreateIndex', true)
    
    const OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    
    //CONEXAO COM O MONGODB:
    mongoose.connect(`${URI}`, OPTIONS)
        .then((_)=>{ console.log('MongoDB', true,  `UP!-> ${URI}  `) })
        .catch((err)=>{ console.log('MongoDB', false, `Erro!-> ${err}`) })
    
    app.dbmg = mongoose

    // console.log('CONFIG::app.dbmg ...', Object.keys(app.dbmg), )
    return true
}