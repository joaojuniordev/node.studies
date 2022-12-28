const { curly } = require('node-libcurl')

const { 
    SLACKURI,
    options,
} = require('../../utils/conf')


const slackPost = async (msg="Alerta...")=>{
    console.log('   SLACK:: ...', msg)

    // SLACK:
    const data_json = '{"text": "${msg}"}'
    options.postFields = data_json
    
    return curly.post(SLACKURI, options).then(r=>console.log).catch(r=>console.log)
        .then(resp=>resp['data'])
        .then(data=>{
            console.log('   DATA #', Object.keys(data))
            return true 
        })
        .catch(err=>{ 
            console.log('   ERROR ### ...', Object.keys(err))
            return false
        })
}



module.exports = {
    slackPost,
}
