/**
 * @CONFIG  DATABASE CONFIGURATION
 * @DB      Postgres,
 */

const configdb = require('../../knexfile')
const knex = require('knex')(configdb)

const { connection } = configdb
console.log('Knex', true,  `UP!-> ${connection?.protocolo}://${connection?.host}:${connection?.port}/${connection.database}`)

module.exports = (app) => {
    
    // EXECUTE MIGRATE:
    // if(app.constants?.KNEX.CMD.UNLOCK){ knex.migrate.unlock([configdb]) }
    if(app.constants?.KNEX.CMD.ROLLBACK){ knex.migrate.rollback([configdb]) }
    if(app.constants?.KNEX.CMD.LATEST){ knex.migrate.latest([configdb]) }
    
    app.db = knex
    
    console.log('CONFIG::dbKnex: app.consts.KNEX.CMD: ...', app.constants?.KNEX.CMD)
    return true
}