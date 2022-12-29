const error  = require('./error.mw')
const file   = require('./file.mw')
const json   = require('./json.mw')


module.exports = (app) => {
    const { MW } = app.constants
    // console.log('UTILS::MW: constants.MW', MW)

    // ADD YOUR MWS:
    return [

        ...error(app),
        ...file(app),
        ...json(app),
        
    ]
}