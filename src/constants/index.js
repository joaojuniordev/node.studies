// VALIDATION:
const LOCALHOST = process.env.JJRDEV_APP_LOCALHOST || "http://localhost"
const SERVER_PORT = process.env.JJRDEV_SERVER_PORT || "8030"
// console.log('constants:: index ... ', process.env)


module.exports = {

    NODE_ENV: process.env.JJRDEV_NODE_ENV,

    APP: {
        NAME: process.env.JJRDEV_APP_NAME,
        SECRET: process.env.JJRDEV_APP_SECRET,
        UPLOAD_DIR: (process.env.JJRDEV_APP_UPLOAD_DIR) ? process.env.JJRDEV_APP_UPLOAD_DIR : "./storage/upload",
        AUTO_SAVEFILE: (process.env.JJRDEV_APP_AUTO_SAVEFILE === "true") ? true : false,//CAST Bool
        SCHEDULED: process.env.JJRDEV_APP_SCHEDULED,
    },

    TOKEN: {
        AUTH_SECRET: process.env.JJRDEV_JWT_SECRET,
        SESSION: (process.env.JJRDEV_JWT_SESSION === "true") ? true : false,
        TEST: process.env.JJRDEV_TOKEN_TEST,
    },

    EXPRESS: {
        URL: LOCALHOST,
        PORT: process.env.JJRDEV_EXPRESS_PORT
    },

    SERVER: {
        URL: process.env.JJRDEV_SERVER_URL || `${LOCALHOST}:${SERVER_PORT}`,
        PORT: SERVER_PORT,
    },

    MW: {
        REGISTERIP: (process.env.JJRDEV_MW_REGISTER_IP === "true") ? true : false,
    },

    DBFAKE:{
        ACTIVATED_JSON: (process.env.JJRDEV_DBFAKE_ACTIVATED_JSON==="true") ?  true : false,
        NAME: process.env.JJRDEV_DBFAKE_DBNAME || "db.json",
        PATH: process.env.JJRDEV_DBFAKE_PATH   || "./storage"    
    },

    KNEX: {
        TABLENAME: process.env.JJRDEV_KNEX_TABLENAME,
        DIRECTORY: process.env.JJRDEV_KNEX_DIRECTORY,
        CMD: {
            UNLOCK: (process.env.JJRDEV_KNEX_UNLOCK === "true") ? true : false,
            ROLLBACK: (process.env.JJRDEV_KNEX_ROLLBACK === "true") ? true : false,
            LATEST: (process.env.JJRDEV_KNEX_LATEST === "true") ? true : false,
        }
    },

    MONGODB: {
        PROTOCOLO: process.env.JJRDEV_MONGODB_PROTOCOLO,
        SRV: process.env.JJRDEV_MONGODB_SRV,
        HOST: process.env.JJRDEV_MONGODB_HOST,
        PORT: process.env.JJRDEV_MONGODB_PORT,
        DB_NAME: process.env.JJRDEV_MONGODB_DB_NAME,
        DB_USER: process.env.JJRDEV_MONGODB_DB_USER,
        DB_PASS: process.env.JJRDEV_MONGODB_DB_PASS,
        PARAMS: process.env.JJRDEV_MONGODB_PARAMS,
    },

    POSTGRES: {
        PROTOCOLO: process.env.JJRDEV_POSTGRES_PROTOCOLO,
        HOST: process.env.JJRDEV_POSTGRES_HOST,
        PORT: process.env.JJRDEV_POSTGRES_PORT,
        DB_NAME: process.env.JJRDEV_POSTGRES_DB_NAME,
        DB_USER: process.env.JJRDEV_POSTGRES_DB_USER,
        DB_PASS: process.env.JJRDEV_POSTGRES_DB_PASS,
        PARAMS: process.env.JJRDEV_POSTGRES_PARAMS,
    },

    EXTERNAL:{
        URL_GETIP: process.env.JJRDEV_URL_GETIP,
    },

    CLOUDFLARE: {
        URL_API: process.env.JJRDEV_CLOUDFLARE_URL_API,
        AUTH_EMAIL: process.env.JJRDEV_CLOUDFLARE_AUTH_EMAIL,
        AUTH_METHOD: process.env.JJRDEV_CLOUDFLARE_AUTH_METHOD,
        AUTH_HEADER: process.env.JJRDEV_CLOUDFLARE_AUTH_HEADER,
        AUTH_KEY: process.env.JJRDEV_CLOUDFLARE_AUTH_KEY,
        ZONE_IDENTIFIER: process.env.JJRDEV_CLOUDFLARE_ZONE_IDENTIFIER,
        RECORD_NAME: process.env.JJRDEV_CLOUDFLARE_RECORD_NAME,
        TTL: process.env.JJRDEV_CLOUDFLARE_TTL,
        PROXY: process.env.JJRDEV_CLOUDFLARE_PROXY,

        SLACK_SITENAME: process.env.JJRDEV_SLACK_SITENAME,
        SLACK_CHANNEL: process.env.JJRDEV_SLACK_CHANNEL,
        SLACK_URI: process.env.JJRDEV_SLACK_URI,
    }

}