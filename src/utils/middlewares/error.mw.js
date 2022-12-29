/**
 * @ERROR 
 * @Middleware Para tratamento de erros
 */

module.exports = (app)=>{
    const { 
        constants:{ APP } 
    } = app
    

    /**
     * @INFO Envia uma resposta de erro de sintaxe em JSON. 
     * @param {*} error Error{ name:'', message:'', stack:'concatenated error', ... }
     * @param {*} req 
     * @param {*} res 
     * @param {*} next function
     * @returns Dispara um res.send(erro)
     */
    const jsonSyntaxErrorMW = (error, req, res, next) =>{
        console.log(`   ErrorMW::jsonSyntaxErrorMW( ${APP.NAME} ):`, true, error?.type)
        console.log(error?.body)
        if (error instanceof SyntaxError) {
            res.send({ 
                status:error.statusCode,
                message:`JSON INVALIDO: ${error.name} ${error.message}`, 
                data: error,//.stack
            }) 
        } else {// SEM ERRO:
            next()
        }
    }



    return [
        
        jsonSyntaxErrorMW,

    ]
}