/**
 * @KNEX is a "batteries included" SQL query builder for:
 *       PostgreSQL, CockroachDB, MSSQL, MySQL, MariaDB, SQLite3, Better-SQLite3, Oracle, and Amazon Redshift, 
 *       designed to be flexible, portable
 * 
 * @CONFIG To: Postgres,
 */

const { POSTGRES, KNEX } = require('./src/constants')
// console.log('### KNEXFILE ... ', POSTGRES)


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    client: 'postgresql',
    // client: 'pg',
    // version:'14.5',
    connection: {
        protocolo: 'postgres',
        host:     POSTGRES.HOST    || 'localhost',
        port:     POSTGRES.PORT    || 5432,
        user:     POSTGRES.DB_USER || 'postgres',
        password: POSTGRES.DB_PASS || '112233-Postgresql',
        database: POSTGRES.DB_NAME || 'studiesdb',
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: KNEX.TABLENAME || 'knex_migrations',
        directory: KNEX.DIRECTORY || './src/database/migrations'
    }

}
