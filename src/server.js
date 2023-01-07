const express = require('express')
const app     = express()
app.express   = express

const consign = require('consign')

// APPLOADER:
consign({ cwd: __dirname })
    .include('./loaders/constants.js')
    .include('./loaders')
    .then('./config')
    .then('./api/models')
    .then('./api/repositories')
    .then('./api/services')
    .then('./api/controllers')
    .then('./api')
    .then('./routes')
    .then('./schedules/index.js')
    .then('./subscribers/chat/socketio.js')
    .into(app)

const { EXPRESS, SERVER } = app.constants

app.listen( EXPRESS?.PORT || 8022, ()=>{
    console.log('### SERVER.JJRDEV ###',{
        LIB:'EXPRESS.js',
        ONLINE  : true,
        MESSAGE : `SEVIDOR INICIADO!`, 
        HOST    : `${EXPRESS?.URL}:${EXPRESS?.PORT}`,
        URL     : `${SERVER?.URL}`,        
    })
})
