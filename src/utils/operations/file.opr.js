/**
 * @OPERATIONS
 * @IMAGE
*/

const fs   = require('fs')
const path = require('path')


/**
 * @Info Criar um atributo meta{} dentro do files_obj
 * @param {*} files Object { fileData_1, ... }
 * @returns files 
 */
const insertManyMeta = (files={})=>{
    for (const key in files) {
        files[key]['meta'] = createMetadata(files[key])
    }
    return files
}

/**
 * @Info Gera um meta a partir de uma image
 * @param {*} file file_image_data
 * @returns meta {...}
 */
const createMetadata = (file={})=>{
    return {
        name: file?.name,
        encoding: file?.encoding,
        mimetype: file?.mimetype,
        truncated: file?.truncated,
        size: file?.size
    }
}

/**
 * @Info Salvar arquivo.
 * @param {*} pathFile /pasta/arquivo.ext
 * @param {*} file FILE
 * @returns Promise
 */
const saveFile = (pathFile='./', {data, name, encoding, mimetype, truncated, size}) =>{
    console.log(`   saveFileOpr:: ... `, pathFile, name)
    const PATH = path.join(pathFile, name)

    return new Promise((resolve, reject)=>{
        fs.writeFile(PATH, data, (err) => {
            if(err){ reject({ error:true, message:err }) }
            resolve({error:false, message:'Arquivo salvo!' })
            // console.log(`   SAVE:`, true, `${PATH}`)
        })
    })
}


module.exports = {

    insertManyMeta,
    createMetadata,
    saveFile,

}