module.exports = (app)=>{
    const { services:{ authService } } = app.api

    
    // CTRLL:
    const signin = async (req, res)=>{
        console.log('AuthCRTLL:: signin ...',)
        const user = req.body

        authService.signin(user)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }
    
    const validateToken = async (req, res)=>{
        console.log('AuthCRTLL:: validateToken ...',)
        const userData = req.body

        authService.validateToken(userData)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }
    
    /*
    const signup = async (req, res)=>{
        console.log('AuthCRTLL:: signup ...',)
        authService.signup()
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }
    
    const signout = async (req, res)=>{
        console.log('AuthCRTLL:: signout ...',)
        authService.signout()
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }*/
    
    

    return {

        signin,
        validateToken,

        // signout,
        // signup,

    }
}