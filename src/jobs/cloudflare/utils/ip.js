const { curly } = require('node-libcurl')


const getIp = async (app)=>{
    const { EXTERNAL:{ URL_GETIP} } = app.constants    
    
    const ip = await curly.get(`${URL_GETIP}`).then(r=>r.data).catch(_=>false)
    // console.log('Cloudflare::utils: ip ... ', ip, URL_GETIP )
    return ip
}

module.exports = getIp
