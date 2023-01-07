//const requestIp = require('request-ip');
const { lookup } = require('geoip-lite')
// const ip2location = require('ip-to-location')

const fn_lookup = lookup


/**
 * @INFO DEU ERRO USANDO LOCALHOST: FALTA VALIDAR SE NAO TIVER ALGUNS PARAMS... 
 *       Libs:  requsetIp: https://github.com/pbojinov/request-ip/blob/master/src/index.js
 *              geoip-lite:
 * @param {*} req 
 * @returns object
 */
const extractIp = (req) =>{
    // console.log('   UTILS::actions::extractIp: ...', req?.headers?.['x-forwarded-for'])
    // console.log('   UTILS::actions::extractIp: ...', req?.socket)

    return {
        express:  {
            ip:     req.ip,
            geo1:   fn_lookup(req.ip),
            // geo2: ip2location.fetch(req.ip).then(ip=>ip)
        },
        header:{
            xcliIp: {
                ip:  req.headers?.['x-client-ip'],
                geo1: fn_lookup(req.headers?.['x-client-ip']),
                // geo2: ip2location.fetch(req.headers?.['x-client-ip']).then(ip=>ip)
            },
            cfIp:   {
                ip:     req.headers?.['cf-connecting-ip'],
                geo1:   fn_lookup(req.headers?.['cf-connecting-ip']),
                // geo2: ip2location.fetch(req.headers?.['cf-connecting-ip']).then(ip=>ip)
            },
            trueIp:{
                ip: req.headers?.['true-client-ip'],
                geo: fn_lookup(req.headers?.['true-client-ip']),
                // geo2:   ip2location.fetch(req.headers?.['true-client-ip']).then(ip=>ip)
            }, 
            xrealIp: {
                ip: req.headers?.['x-real-ip'],
                geo: fn_lookup(req.headers?.['x-real-ip']),
                // geo2:   ip2location.fetch(req.headers?.['x-real-ip']).then(ip=>ip)
            },
            xforwIp: {
                ip: req.headers?.['x-forwarded'],
                geo: fn_lookup(req.headers?.['x-forwarded']),
                // geo2: ip2location.fetch(req.headers?.['x-forwarded']).then(ip=>ip)
            },
            xforwfIp: {
                ip1:    req.headers?.['x-forwarded-for'].split(', ')[0],
                geo1A:  fn_lookup(req.headers?.['x-forwarded-for'].split(', ')[0]),
                // geo1B:  ip2location.fetch(req.headers?.['x-forwarded-for']).then(ip=>ip),

                ip2:    req.headers?.['x-forwarded-for'].split(', ')[1],
                geo2A:  fn_lookup(req.headers?.['x-forwarded-for'].split(', ')[1]),
                // geo2B:  ip2location.fetch(req.headers?.['x-forwarded-for']).then(ip=>ip),
            }
        },
        rconn:  {
            ip: req.connection?.remoteAddress,
            geo1: fn_lookup(req.connection?.remoteAddress),
            // geo2:   await ip2location.fetch(req.connection.remoteAddress).then(ip=>ip)
        },
        rskt: {
            ip:  req.socket?.remoteAddress || req.socket?.address,
            geo1: fn_lookup(req.socket?.remoteAddress || req.socket?.address),
            // geo2: ip2location.fetch(req.socket?.remoteAddress || req.socket?.address).then(ip=>ip)
        },
    }
}



module.exports = { 

    extractIp,

}