/**
 * @CONFIG  DATABASE CONFIGURATION
 * @DB      Postgres,
 */

const configdb = require('../../knexfile')
const knex = require('knex')(configdb)

const { 
    connection:{ protocolo, host, port, database }
} = configdb


module.exports = (app) => {
    
    // EXECUTE MIGRATE:
    // if(app.constants?.KNEX.CMD.UNLOCK){ knex.migrate.unlock([configdb]) }
    if(app.constants?.KNEX.CMD.ROLLBACK){ knex.migrate.rollback([configdb]) }
    if(app.constants?.KNEX.CMD.LATEST){ knex.migrate.latest([configdb]) }
    
    app.db = knex
    
    console.log('CONFIG::dbKnex: KNEX.CMD: ...', app.constants?.KNEX.CMD)
    console.log('Knex', true,`UP!-> ${protocolo}://${host}:${port}/${database}`)
    return true
}