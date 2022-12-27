const hourSHD  = require('./hour.shd')


module.exports = (app) => {
    // console.log('   UTILS::schedules::index ... ', )

    // ADD YOUR SCHEDULES: []
    return [
        
        hourSHD(app)
        
    ]
}