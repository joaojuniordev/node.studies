const getIp        = require('../../utils/ip')
const getZones     = require('./getZones')
const getRecords   = require('./getRecords')
const updateRecors = require('./updateRecord')


module.exports = (app)=>{
    console.log('Cloudflare::dns ... ',)

    const updateDNS = async ()=>{
        console.log('Cloudflare::updateDNS ... ',)
        
        // GET IP: 
        const ip = await getIp(app)
        if( !ip ){ return false }
        
        // GET ZONES:
        const respZN = await getZones()
        console.log(`   ZONES [NEW_IP: ${ip}] ### error`, [respZN?.error, respZN?.message, respZN.zones?.length])
        if( respZN?.error ){ return respZN }
        
        // RUN ZONES:
        for await (const zone of respZN?.zones) {
            const { id:zone_identifier, name:zone_name } = zone
            
            // GET RECORDS:
            const respRCD = await getRecords(zone_identifier)
            console.log(`       RECORDS ### `,[zone_name, zone_identifier],[respRCD?.message, respRCD.records?.length])
            if( respRCD?.error ){ continue }// SKIP EXECUTION

            // UPDATE RECORDS:
            const respUPRCD = await updateRecors(respRCD?.records, ip, zone_identifier)
            console.log('       [ZONE] ### UP', respUPRCD)
            // if( respUPRCD?.error ){ return respUPRCD }
        }

        return { error:false, message:"Em construção...", data:[] }
    }

    return updateDNS
}
