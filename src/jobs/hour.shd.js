module.exports = (app)=>{
    // const { constants } = app
    
    const currentHour = async ()=>{
        app.currentDatetime = new Date().toLocaleString()
        return { CURRENT_DATETIME:app.currentDatetime }
    }

    return currentHour
}