const { curly } = require('node-libcurl')
// const querystring = require('querystring')

const { 
    CF_URL_API,
    options,
} = require('../../utils/conf')


module.exports = async (records=[], ip, zone_identifier)=>{
    delete options.postFields// CLEAN
    let resp = { error:false , message:"???" }
    
    for await (const record of records) {
        const { id:record_identifier, name:record_name ,content:currentIp } = record
        console.log('   updateRecors:: NEW_IP', { ip }, zone_identifier, record_name, record_identifier)
        // EQUALS IPs:
        // if(ip===currentIp){ return { error:true, message:`IP não mudou: ${currentIp}`, records:[record] }}
        const url = `${CF_URL_API}/${zone_identifier}/dns_records/${record_identifier}`        

        // UPDATE RECORS:
        resp = await curly.patch(url, formartData(record, ip, options)) 
            .then(resp=>resp['data'])
            .then(({result:records, success, errors, messages })=>{ 
                // console.log('   SUCCESS #', success)
                if(success){ return { error:false, message:`Zona atualizada.`, records } }
                const { message } = errors[0]
                return { error:true, message, records:null }
            })
            .catch(err=>({ error:true, message:err, records:undefined }))
        // BREAK LOOP:
        if( resp?.error ){ break }
    }
    return resp
}

const formartData = (record, ip, options)=>{
    const { 
        id:record_identifier, 
        name:record_name,
        type:record_type,
        ttl: record_ttl,
        proxy:record_proxy=true, 
        content: currentIp
    } = record
    // console.log('   formarterData ### ', [ record_name, record_identifier, currentIp, record_type, record_ttl, record_proxy ])

    const data=`{"type":"${record_type}","name":"${record_name}","content":"${ip}","ttl":${record_ttl},"proxied":${record_proxy}}`
    // console.log('   formartData:: ###', data)

    // options.postFields = JSON.stringify(data)
    // options.postFields = querystring.stringify(data)
    options.postFields = data
    return options
}

