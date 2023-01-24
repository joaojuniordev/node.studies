const { hashEncryption } = require('../../utils/encryptions')


/** 
 * @INFO https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, name: 'Adm Root'  , email:'root@jjrdev.tk'     , passwd:hashEncryption('123'), admin:true},
    {id: 2, name: 'Adm JJRDEV', email:'adm@jjrdev.tk'      , passwd:hashEncryption('1234'), admin:true},
    {id: 3, name: 'Visitante' , email:'visitante@email.com', passwd:hashEncryption('12345'), admin:false},
  ]);
};
