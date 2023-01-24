

/**
 * 
 * @param {*} value 
 * @param {*} msg 
 */
const existsOrError = (value, msg)=>{
    // console.log('   existsOrError ...', value, typeof(value), !value)
    if(!value){ throw msg }
    if(Array.isArray(value) && value.length===0){ throw msg }
    if(typeof(value)==='string' && !value.trim()){ throw msg }
}

/**
 * 
 * @param {*} value 
 * @param {*} msg 
 * @returns 
 */
const notExistsOrError = (value, msg)=>{
    // console.log('   notExistsOrError ...', value, typeof(value), !value)
    try{
        existsOrError(value, msg)
    }catch{
        return // ERROR: I don't throw an error
    }    
    throw msg  // NO ERROR: throw an error
}

/**
 * 
 * @param {*} valueA 
 * @param {*} valueB 
 * @param {*} msg 
 */
const equalsOrError = (valueA, valueB, msg)=>{
    // console.log('   equalsOrError ...', valueA, valueB)
    if(valueA !== valueB){ throw msg }
}



module.exports = {
    existsOrError,
    notExistsOrError,
    equalsOrError,
}
