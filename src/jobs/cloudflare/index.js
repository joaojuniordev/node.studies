const updateDNS = require('./services/dns')
const email     = require('./services/email')

module.exports = (app)=>{
    console.log('Jobs::Cloudflare:: ... ',)
    
    return [
        updateDNS(app),
        email(app)
    ]
}

