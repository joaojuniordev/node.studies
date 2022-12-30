/**
 * @OPERATIONS
 * @DIR Manuseio de pastas do sistema 
*/

const fs = require('fs')
const _path = require('path')


/**
 * Ler os Dirs dentro de um Dir
 * @param {*} pathDir 
 * @returns  Obj {..., content:[]}
 */
const readDirsInsideDir = (pathDir='./') => {
    console.log(`   DIR.OPR::readFilesDir:${pathDir}`)
    
    return new Promise((resolve, reject) => {        
        if (fs.existsSync(pathDir)) {
            fs.readdir(pathDir, (err, content) => {
                if (err) { reject({ status:401, message:`Erro ao tentar ler a pasta!`, content:[], error:err }) }
                const dir = content.filter(item => {
                    if (item.includes('.') === undefined) {//pasta nao da pra ler o ponto:undefined
                        return item
                    }
                })
                resolve({ status:200, message:`Conteúdo da pasta...`, path:`${pathDir}`, dir })
            })
        } else {
            reject({ status:404, message:`Ação interrompita, a pasta não pôde ser lida porque não existe!`, content:[], path:pathDir })
        }
    })
}

/**
 * Ler os Files de um Dir
 * @param {*} pathDir 
 * @returns  Obj {..., content:[]}
 */
const readFilesDir = (pathDir='./') => {
    console.log(`   DIR.OPR::readFilesDir:${pathDir}`)

    return new Promise((resolve, reject) => {
        //leitura de uma pasta:__dirname = pasta atual
        if (fs.existsSync(pathDir)) {
            fs.readdir(pathDir, (err, content) => {
                if (err) { reject({ status:401, message:`Erro ao tentar ler a pasta!`, content:[], error:err }) }//DEU ERRO? vonta a key content para error
                const files = content.filter(item => {
                    if (item.includes('.')) {//pasta nao da pra ler o ponto:undefined
                        return item
                    }
                })
                resolve({ status:200, message:`Conteúdo da pasta...`, path:`${pathDir}`, files:files })
            })
        } else {
            reject({ status:404, message:`Ação interrompita, a pasta não pôde ser lida porque não existe!`, content:[], path:pathDir })
        }
    })
}

/**
 * Ler tudo dentro de um Dir
 * @param {*} pathDir 
 * @returns  Obj {..., content:[]}
 */
const readDir = (pathDir='./') => {
    console.log(`   DIR.OPR::ReadDir:${pathDir}`)
    
    return new Promise((resolve, reject) => {
        //leitura de uma pasta:__dirname = pasta atual
        if (fs.existsSync(pathDir)) {
            fs.readdir(pathDir, (err, content) => {
                if (err) { reject({ status:401, message:`Erro ao tentar ler a pasta!`, content:[], error:err }) }//DEU ERRO? vonta a key content para error
                resolve({ status:200, message:`Conteúdo da pasta...`, path:`${pathDir}`, content:content })
            })
        } else {
            reject({ status:404, message:`Ação interrompita, a pasta não pôde ser lida porque não existe!`, content:[], path:pathDir })
        }
    })
}

/**
 * Criar um dir
 * @param {*} pathDir 
 * @param {*} name 
 * @returns Obj
 */
const mkDir = (pathDir='./', name=null) => {
    pathDir = name ? _path.join(pathDir, name) :pathDir
    
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(pathDir)) {
            console.log(`   DIR.OPR::MkDir: [...] ${pathDir}`)
            fs.mkdir(pathDir, (err) => {
                if (err) { reject({ code:401, message:`Erro ao tentar criar a pasta!`, error:err }) }
                resolve({ code:200, message:`Pasta criada!`, path:`${pathDir}/${name}` })
            })
        } else {
            console.log(`   DIR.OPR::MkDir: [break] ${pathDir}`)
            reject({ code:402, message:`Ação interrompita, a pasta não pôde ser criada porque já existe!`, path:pathDir })
        }

    })
}

/**
 * Cria um Dir se ele nao existir
 * @OBS     Só para melhorar o entendimento atraves do nome
 * @param {*} pathDir 
 * @param {*} name 
 * @returns 
 */
const mkDirIfNoExist = (pathDir='./', name=null) => {
    //console.log(` DIR.OPR::MkDirIfNoExist:${pathDir}`)
    return mkDir(pathDir, name)
}

/**
 * @returns Promise:Array Content [names.js, ...]
 */
const getFileNames = async (path) => {
    const dirFileNames = await readDir(path).then(dir => dir.content).catch(e => e.content)
    
    return dirFileNames.filter(file => {
        if (isFile(file)) {
            return file
        }
    })
}

const isFile = (fileName) => {
    const havePoint = fileName.indexOf('.') !== -1
    const firstIsLetter = fileName[0] != '.'
    if (firstIsLetter && havePoint) {
        return true
    }
    return false
}



module.exports = {
    readDir,
    mkDir,
    mkDirIfNoExist,
    getFileNames,
    readFilesDir,
    readDirsInsideDir
}