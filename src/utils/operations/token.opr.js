const jwt = require('jwt-simple')

const { TOKEN:{ AUTH_SECRET } } = require('../../constants')

const dateMili       = Date.now()// since 1970
const dateSeg        = (dateMili / 1000)    
const DATESEC_ROUNDS = Math.floor(dateSeg)    
const SEG=60, MIN=60, HOUR=24, DAY=1 



/**
 * @param {*} payload { ..., iat:DateSeg, exp:DateSeg }
 * @param {*} auth_secret String (key_auth_secret=TOKEN_SECRET)
 * @returns string TOKEN
 */
const create = (payload={}, auth_secret=AUTH_SECRET)=>{
    const PAYLOAD = {
        iat: DATESEC_ROUNDS,
        exp: DATESEC_ROUNDS + (SEG * MIN * HOUR * DAY),
        ...payload 
    }
    return jwt.encode(PAYLOAD, auth_secret)
}

/**
 * @Info Atenção usar esta função dentro de um try-catch.
 *       jwt.decode() gerará erro caso o token seja inválido!   
 * @param {*} token String
 * @param {*} auth_secret String (key_auth_secret=TOKEN_SECRET)
 * @returns bool
 */
const validate = async (token='', auth_secret=AUTH_SECRET, noVerify=false)=>{
    const tokenDecode     = jwt.decode(token, auth_secret)
    const dateTokenDecode = new Date(tokenDecode.exp * 1000)// sec * 1000 = mili
    const dateNow         = new Date()
    
    if( dateTokenDecode > dateNow ){ return true }// renew token?
    return false
}



module.exports = { 
    create,
    validate, 
}