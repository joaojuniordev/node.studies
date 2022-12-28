const hourJOB        = require('./hour.job')
const ipJOB          = require('./ip.job')
const cloudflareJOBS = require('./cloudflare')


module.exports = (app) => {
    console.log('   JOBS:: ... ' )

    // ADD YOUR SCHEDULES: []
    return [
        
        hourJOB(app),
        ipJOB(app),
        ...cloudflareJOBS(app),

    ]
}