/**
 * @SCHEDULES  Contem todos os schedules, de libs e autorais, para app.
 *             Local apropriado para adicionar os novos schedules.
 **@DEFAULT    CRON:(min , hour, day , month , dayweek)
 **                 (0-59, 0-23, 1-31, 1-12  , 0-6    )
 *@EXAMPLE     https://www.freeformatter.com/cron-expression-generator-quartz.html
*/

const { scheduleJob } = require('node-schedule')

const jobs = require('../jobs')


/**
 * @param {*} app 
*/
module.exports = (app)=>{
    const { 
        constants:{ APP:{ SCHEDULED='*/1 * * * *' } } 
    } = app

    const jobList = jobs(app)
    
    // JOB: TIMED QUEUE
    scheduleJob(SCHEDULED, async function(){
        const date = new Date().toLocaleString()
        console.log('   schedules::', SCHEDULED, jobList, date)

        // EMPTY LIST:
        if(jobList.length===0){ return }        
        
        // RUN JOB LIST: 
        const firstJob = jobList[0]         // FIRST
        const response = await firstJob()   // FIRST EXEC
        jobList.shift()                     // REMOVE FIRST
        jobList.push(firstJob)              // MOVE TO LAST

        console.log('   schedules::Job ... ', response)
    })

    return true
}