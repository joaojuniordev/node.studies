const { curly } = require('node-libcurl')

const { 
    CF_URL_API,
    options,
} = require('../../utils/conf')


module.exports = async (zone_identifier)=>{
    console.log('   GetRecords:: ... ')
    const url_all = `${CF_URL_API}/${zone_identifier}/dns_records?type=A&match=all`
    delete options.postFields// CLEAN
    
    // GET ALL RECORDS:
    return curly.get(url_all, options) 
        .then(resp=>resp['data'])
        .then(({result:records, success, errors, messages })=>{
            // console.log('   SUCCESS #', success)
            if(success){ return { error:false, message:"Registros atualizaveis.", records } }
            const { message } = errors[0]
            return { error:true, message:message, records:null }
        })
        .catch(err=>{
            console.log('   ERROR ### ...', Object.keys(err),  err['message']) 
            return { error:true, message:err['message'], records:undefined }
        })
}
