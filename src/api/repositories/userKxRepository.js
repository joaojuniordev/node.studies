/**
 * @USER_REPOSITORY
*/
module.exports = (app) => {
    const {
        api: { models: { userModel } }
    } = app


    /**
     * 
     * @param {*} query 
     * @param {*} columns 
     * @param {*} annulled 
     * @returns 
     */
    const find = async (query={}, columns=[], annulled='deletedAt')=>{
        return app.db('users')
                .where(query).select(columns).whereNull(annulled)
                .then(users=>({ error:false, users }))
                .catch(err =>({ error:true, users:null, message:err }))
    }

    /**
     * 
     * @param {*} id 
     * @param {*} columns 
     * @param {*} anulled deletedAt
     * @returns 
     */
    const findById = async (id, columns=[], annulled='deletedAt')=>{
        return app.db('users')
                .where({ id }).select(columns).whereNull(annulled).first()
                .then(user=>({ error:false, user }))
                .catch(err=>({ error:true, user:null, message:err }))
    }

    /**
     * 
     * @param {*} user 
     * @returns 
     */
    const save = async (user) => {
        return app.db('users').insert(user)
            .then(user=>({ error:false, user }))
            .catch(e=>({ error:true, user:null, message:e?.message }))
    }

    /**
     * 
     * @param {*} id 
     * @param {*} user 
     * @returns 
     */
    const findByIdAndUpdate = async (id, user={})=>{
        return app.db('users')
                .where({ id }).update(user)
                .then(upUser=>({ error:false, user:upUser, oldUser:user }))
                .catch(err=>({ error:true, user:null, message:err }))
    }

    /**
     * 
     * @param {*} query 
     * @param {*} user 
     * @returns 
     */
    const update = async (query={}, user={})=>{
        return app.db('users')
                .where(query).update(user)
                .then(upUser=>({ error:false, user:upUser, oldUser:user }))
                .catch(err=>({ error:true, user:null, message:err }))
    }
    
    /**
     * 
     * @param {*} id 
     * @returns 
     */
    const remove = async (id)=>{
        return app.db('users')
                .where({ id }).del()
                .then(delUser=>({ error:false, resp:delUser }))
                .catch(err=>({ error:true, resp:null, message:err }))
    }



    return {
        find,
        findById,
        save,
        findByIdAndUpdate,
        update,
        remove,
    }
}