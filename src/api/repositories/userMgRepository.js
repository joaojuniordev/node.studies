/**
 * @USER_REPOSITORY
*/
module.exports = (app) => {
    const {
        api: { models: { userModel } }
    } = app


    /**
     * 
     * @param {*} query Obj { fields, ... }
     * @param {*} fields String 'fields ...'
     * @returns 
     */
    const find = async (query={}, fields=[]) => {
        try {
            const users = await userModel.find(query).select(fields)
            return { error: false, users }
        } catch (error) {
            return { error: true, message: error.message, users: [] }
        }
    }

    /**
     * 
     * @param {*} id 
     * @param {*} fields Campos de pesquisa (geo.coordinates incluidas automaticamento pelo repository).
     * @returns 
     */
    const findById = async (id, fields=[]) => {
        try {
            const user = await userModel.findById({ _id: id }).select(fields)//.select(`${fields} geo.coordinates`)
            return { error: false, user }
        } catch (error) {
            return { error: true, message: error.message, user: null }
        }
    }

    /**
     * 
     * @param {*} user 
     * @returns 
     */
    const save = async (user) => {
        try {
            const respUser = await userModel(user).save()
            return { error: false, user:respUser }
        } catch (error) {
            return { error: true, user:null, message: error.message }
        }
    }

    /**
     * 
     * @param {*} id 
     * @param {*} user 
     * @returns 
     */
    const findByIdAndUpdate = async (id, user) => {
        try {
            const upUser = await userModel.findByIdAndUpdate(id, user)
            return { error:false, user:upUser }
        } catch (error) {
            return { error:true, user:null, message:error?.message }
        }
    }

    /**
     * @Info  Cuidado!!! SEMPRE ATUALIZA o primeiro registro.
     *        Mesmo que passe um id errado!
     * @param {*} id 
     * @param {*} user 
     * @returns 
     */
    const findOneAndUpdate = async (query, user) => {
        try {
            const upUser = await userModel.findOneAndUpdate(query, user)
            return { error:false, user:upUser }
        } catch (error) {
            return { error:true, message:error?.message, user:null }
        }
    }
    
    /**
     * 
     * @param {*} id 
     * @param {*} fields 
     * @returns 
     */
    const remove = async (id, fields=[]) => {
        try {
            const delUser = await userModel.findByIdAndRemove({ _id: id }).select(fields)
            return { error: false, user:delUser }
        } catch (error) {
            return { error: true,  user: null, message:error?.message, }
        }
    }



    return {
        find,
        findById,
        save,
        findByIdAndUpdate,
        findOneAndUpdate,
        remove,
    }
}