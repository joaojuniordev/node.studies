module.exports = (app)=>{
    // const { constants } = app
    
    const currentHourJob = async ()=>{
        app.currentDatetime = new Date().toLocaleString()
        return { CURRENT_DATETIME:app.currentDatetime }
    }

    return currentHourJob
}