/**
 * @ERROR 
 * @Middleware Para tratamento de erros
 */

module.exports = (app)=>{
    const { 
        constants:{ APP } 
    } = app
    

    const jsonParseFormDataMW = (req, res, next) =>{
        const { 'content-type':contentType } = req.headers
        const { body={} } = req
        const multiPart = [ contentType.includes('multipart'), contentType.includes('form-data')]

        // MULTIPART/FORM-DATA:
        if( multiPart.includes(true) ){
            for (const key of Object.keys(body)) {
                body[key] = JSON.parse(body[key])
            }
            // console.log(`   JsonMW::jsonParse: body ...`, [contentType], body)
        }
        
        next()
    }




    return [
        
        jsonParseFormDataMW,

    ]
}