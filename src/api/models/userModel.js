/**
 * @CLIENT_MODEL
*/

// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

module.exports = (app) => {

    const user = new app.dbmg.Schema({
        username: {
            type: String,
            // required: [true, 'O nome de usuário é obrigatório']
        },
        email: {
            type: String,
            required: [true, 'O email é obrigatório'],
        },
        passwd: {
            type: String,
            default: null
        },
        deleteAt:{
            type: Date,
            default: null,
        },
        // geo: {
        //     type: {
        //         type: String,
        //         enum: ['Point'],
        //         required: true
        //     },
        //     coordinates: {
        //         type: [Number],
        //         required: true
        //     }
        // },
        dateRegistration: {
            type: Date,
            default: Date.now,
        }
    })

    // user.index({ geo: '2dsphere' })//2d: Lat e long
    
    console.log('   app.dbmg.models.user ...')
    return app.dbmg.model('user', user)
}