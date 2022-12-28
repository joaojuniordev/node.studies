const { curly } = require('node-libcurl')

module.exports = (app)=>{
    const { EXTERNAL:{ URL_GETIP} } = app.constants

    const getIpJob = async ()=>{
        app.ip = await curly.get(`${URL_GETIP}`).then(r=>r.data).catch(_=>false)
        return app.ip
    }
    return getIpJob
}

