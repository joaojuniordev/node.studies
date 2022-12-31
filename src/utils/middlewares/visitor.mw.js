const { extractIp } = require('../actions/ip.act')
const { saveFile:saveVisior }  = require('../operations/file.opr')



module.exports = (app)=>{
    const { 
        constants:{ APP:{ REGISTER_VISITOR } } 
    } = app
    // console.log('   VisitorMW:: ... ', REGISTER_VISITOR)


    const registerVisitorMW = async (req, res, next) => {
        if(REGISTER_VISITOR){
            const dateTime = new Date().toLocaleString()
            const dayHour  = dateTime.replace(' ','_').split(':')[0].concat('H')
            // CURRENT VISITOR:
            const { xrealIp } = extractIp(req).header
            const visitorIp   = { date:dateTime , ...xrealIp }

            // PAST VISTOR:
            let visitors = {}
            try {
                visitors = require('../../../storage/value/register/visitors.json')
            } catch (error) {
                console.log('   Visitor.mw::registerVisitorMW [ERROR] visitors -> { }')
            }            
            
            // ALL REGISTER:
            const visitorsDay = visitors[dayHour] || []
            const allRegister = {
                ...visitors,
                [dayHour]:[ ...(visitorsDay), visitorIp ]
            }
            // SAVE FILES:       
            saveVisior('./storage/value/register' ,{ data:JSON.stringify(allRegister), name:`visitors.json` })
            console.log('   Visitor.mw::registerVisitorMW: ### ', visitorIp)
        }

        next()
    }



    return [
        registerVisitorMW,
    ]
}