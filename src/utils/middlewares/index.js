const errors  = require('./errors.mw')


module.exports = (app) => {
    const { MW } = app.constants
    // console.log('UTILS::MW: constants.MW', MW)

    // ADD YOUR MWS:
    return [

        ...errors(app),
        
    ]
}