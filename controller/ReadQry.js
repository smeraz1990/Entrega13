const database = require('../src/database')
    //Mandar llamar la funcion para leer productos
const ReadProductos = async() => {
        try {
            const camposProductos = ['title', 'price', 'thumbnail']
            const resultReadProductos = await database.databaseConnection.from('productos').select(camposProductos)
            return resultReadProductos
                //console.log(resultReadProductos)
        } catch (err) {
            console.log(err)
            database.databaseConnection.destroy()
        }
    }
    //Mandar llamar la funcion para leer Mensajes
const ReadMensajes = async() => {
    try {
        const camposMensajes = ['email', 'horaenvio', 'message']
        const resultReadMensajes = await database.databaseConnectionSQL3.from('mensajes').select(camposMensajes)
        return resultReadMensajes
            //console.log(resultReadProductos)
    } catch (err) {
        console.log(err)
        database.databaseConnectionSQL3.destroy()
    }
}

module.exports = { ReadProductos, ReadMensajes }