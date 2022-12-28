const { curly }   = require('node-libcurl')

const { 
    CF_URL_API,
    options,
} = require('../../utils/conf')


module.exports = ()=>{
    console.log('Cloudflare::getZones ... ',)
    delete options.postFields// CLEAN

    return curly.get(`${CF_URL_API}?&match=all`, options)
            .then(resp=>resp['data'])
            .then(({result:zones, success, errors, messages })=>{
                // console.log('   SUCCESS #', success)
                if(success){ return { error:false, message:"Lista de zonas.", zones }}
                const { message } = errors[0]
                return { error:true, message, zones:null }
            })
            .catch(err=>{
                console.log('   ERROR ### ...', Object.keys(err),  err['message']) 
                return { error:true, message:err['message'], zones:undefined }
            })
}
