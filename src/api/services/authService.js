module.exports = (app) =>{
    const {
        constants:{ TOKEN:{ AUTH_SECRET } },
        encryptions:{ hashCompareSync },
        validations:{  },
        token:{ create:createToken, validate:validate_Token },
        api:{ repositories: { userKxRepository } }
    } = app


    // SERVICES:
    const signin = async (user={})=>{
        console.log('AuthService::signin...', user)
        try {
            // VALIDATION: user and passwd
            if( !user.email || !user.passwd ){ return { error:false, status:400, message:"Usuário ou senha errados.", data:{} } }

            // FIND USER:
            const userFound = await userKxRepository.find({ email:user.email})
                                    .then(r=>r.users[0]).catch(()=>null)
            if( !userFound?.email ){ return { error:false, status:400, message:"Usuário não encontrado.", data:{} } }

            // CHECK PASSWD:
            const isMatch = hashCompareSync(user.passwd, userFound.passwd)
            if( !isMatch ){ return { error:false, status:400, message:"Senha inválida!", data:{} } }

            // TOKEN: payload
            const dateNow = Math.floor(Date.now()/1000)// Date seconds
            const payload = {
                id: userFound.id,
                name: userFound.name,
                email: userFound.email,
                admin: userFound.admin,
                iat: dateNow,
                exp: dateNow + (60 * 60 * 24 * 2),// (SEC, MIN, HOUR, DAY)
            }
            
            // CREATE TOKEN:
            const token = createToken(payload, AUTH_SECRET)
            console.log(' ... new Token', !!token )

            return { error:false, status:200, message:"Usuário logado.", data:{ ...payload, token } }
        } catch (error) {
            console.log(' AuthService::signin... ERROR', error)
            return { error:true, status:400, message:error } 
        }
    }
    
    
    const validateToken = async (userData={})=>{
        console.log('AuthService::validateToken...', userData)
        try {
            let tokenStatus = false
            if(userData){ tokenStatus = await validate_Token(userData.token, AUTH_SECRET) }
            console.log('   statusToken ... ', tokenStatus)

            return { error:false, status:200, message:"Token válido.", data:{ token_status:tokenStatus } }
        } catch (error) {
            //TOKEN WITH PROBLEM: expired ...
            console.log('   validateToken ... ERROR', true )
            return { error:true, status:400, message:"Token inválido!" } 
        }
    }

    /*
    const signup = async ()=>{
        console.log('AuthService::signup...')
        return 'cadastrar...'
    }

    const signout = async ()=>{
        console.log('AuthService::signout...')
        return 'sair...'
    }
    */
   


    return {

        signin,
        validateToken,

        // signup,
        // signout,

    }
}