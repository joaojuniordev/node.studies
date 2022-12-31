/**
 * @CONFIG   PASSPORT CONFIGURATION
 * @PASSPORT
 */

const passport    = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')


module.exports = (app)=>{
    const {
        constants:{ TOKEN:{ AUTH_SECRET, SESSION } }
    } = app
    

    // IMPLEMENT PASSPORT:
    
    // PARAMS FOR STRATEGY:
    const params = {
        secretOrKey: AUTH_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    // USED STRATEGY:
    const strategy = new Strategy(params, (payload, done)=>{
        app.db('users')
            .where({ id: payload.id||null }).first()
            .then(user=> done(null, user ? {...payload }:false))
            .catch(err=> done(err, false))
    })

    passport.use(strategy)

    // app.config.passport = {...}
    return {
        auth: ()=> passport.authenticate('jwt', { session:SESSION }),
        authToggle: (activated=true)=>{
            if(activated){ return passport.authenticate('jwt', { session:SESSION }) }
            return (req, res, next)=>next()
        }
    }
}