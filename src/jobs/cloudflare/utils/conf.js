// const { curly } = require('node-libcurl')

const URL_GETIP     = process.env.JJRDEV_URL_GETIP
const CF_EMAIL   = process.env.JJRDEV_CLOUDFLARE_AUTH_EMAIL
const CF_KEY     = process.env.JJRDEV_CLOUDFLARE_AUTH_KEY
const CF_URL_API = process.env.JJRDEV_CLOUDFLARE_URL_API
const SLACKURI   = process.env.JJRDEV_SLACKURI

const options = {
    // postFields: JSON.stringify({ }),
    httpHeader: [
        `X-Auth-Email: ${CF_EMAIL}`,
        `X-Auth-Key: ${CF_KEY}`,
        // `Authorization:bearer ${CF_KEY}`,
        'Content-Type: application/json',
        // 'Accept: application/json'
    ],
}


module.exports = {
    URL_GETIP,
    CF_EMAIL,
    CF_KEY,
    CF_URL_API,
    SLACKURI,
    options,
}