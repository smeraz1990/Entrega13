const database = require('../src/database')
const qryRead = require('./ReadQry')
    //Creamos la funcion con la estructura para crear la tabla Productos
const createTable = async() => {
        try {
            await database.databaseConnection.schema.dropTableIfExists('productos')
            await database.databaseConnection.schema.createTable('productos ', producttable => {
                producttable.increments('ProductoID').primary()
                producttable.string('title', 100).notNullable()
                producttable.integer('price').notNullable()
                producttable.string('thumbnail', 100).notNullable()
            })
            ProductosDB = await qryRead.ReadProductos()
            console.log('tabla productos creada')


        } catch (err) {
            console.log(err)
            database.databaseConnection.destroy()
        }
    }
    //Creamos la funcion con la estructura para crear la tabla Mensajes
const createTableMensajes = async() => {
        try {
            await database.databaseConnectionSQL3.schema.dropTableIfExists('mensajes')
            await database.databaseConnectionSQL3.schema.createTable('mensajes ', msgtable => {
                msgtable.increments('MensajeID').primary()
                msgtable.string('email', 100).notNullable()
                msgtable.string('horaenvio').notNullable()
                msgtable.string('message', 100).notNullable()
            })
            messagesArray = await qryRead.ReadMensajes()
            console.log('tabla mensajes creada')


        } catch (err) {
            console.log(err)
            database.databaseConnectionSQL3.destroy()
        }
    }
    //Mandar llamar la funcion para insertar productos
const InsertProductos = async(datos) => {
        try {
            await database.databaseConnection('productos').insert(datos)
            console.log('Producto Insertado')

        } catch (err) {
            console.log(err)
            database.databaseConnection.destroy()
        }
    }
    //Mandar llamar la funcion para insertar mensajes
const InsertMensajes = async(datos) => {
    try {
        await database.databaseConnectionSQL3('mensajes').insert(datos)
        console.log('Mensaje Insertado')

    } catch (err) {
        console.log(err)
        database.databaseConnectionSQL3.destroy()
    }
}

module.exports = { createTable, createTableMensajes, InsertProductos, InsertMensajes }