const socket = io()
const ProductosForm = document.querySelector('#ProductosForm')
const titleInput = document.querySelector('#title')
const priceInput = document.querySelector('#price')
const imgPool = document.querySelector('#thumbnail')

//Datos para mensajeria
const messageForm = document.querySelector('#messageForm')
const emailInput = document.querySelector('#emailInput')
const nombreInput = document.querySelector('#nombreInput')
const apellidoInput = document.querySelector('#apellidoInput')
const edadInput = document.querySelector('#edadInput')
const aliasInput = document.querySelector('#aliasInput')
const avatarInput = document.querySelector('#avatarInput')
const messageInput = document.querySelector('#messageInput')
let entendimiento=0

//Funciones para Productos
function renderProductos(productos) {
    fetch('./productos.hbs').then(response => {
        response.text().then((plantilla) => {
            const template = Handlebars.compile(plantilla);
            let html = template({ productos });
            $("#gridProductos tbody").html(html)
            titleInput.value = ""
            priceInput.value = ""
            imgPool.value = ""
        })
    })
}

socket.on('server:productos', productos => {
    renderProductos(productos)
})


ProductosForm.addEventListener('submit', event => {
    event.preventDefault()

    const productInfo = {
        title: titleInput.value,
        price: priceInput.value,
        thumbnail: imgPool.value
    }

    sendProductos(productInfo)
})


function sendProductos(productInfo) {
    socket.emit('client:product', productInfo)
}

//Funciones para mensajeria
function sendMessage(messageInfo) {
    socket.emit('client:menssage', messageInfo)
}

function renderMessage(messagesInfo) {
    //se va a desnormalizar
    const author = new normalizr.schema.Entity('author',{},{idAtrribute:'id'})
    const mensaje = new normalizr.schema.Entity('mensaje',{author: author},{idAtrribute:"id"})
    const schemamensajes = new normalizr.schema.Entity('mensajes',{
        mensajes:[mensaje]
    },{idAtrribute:"id"})
    let desnomalize = normalizr.denormalize(messagesInfo.result,schemamensajes,messagesInfo.entities)
    //console.log(desnomalize)
    let caracteresNomalizados = (JSON.stringify(messagesInfo)?.length)
    //console.log(caracteresNomalizados)
    let caracteresNormales = (JSON.stringify(desnomalize)?.length)
    //console.log(caracteresNomalizados)
    //console.log(caracteresNormales)
    //console.log(entendimiento)
    //console.log("desnormalizado",desnomalize)
    //console.log("normalizado", messagesInfo)
    if(desnomalize !== undefined || messagesInfo.length != 0)
    {
        if(desnomalize !== undefined)
        {
            messagesInfo = desnomalize.mensajes
            entendimiento = (caracteresNomalizados*100)/caracteresNormales
        }
        if(entendimiento != 0)
        {
            $("#spnComprencion").html(`Comprencion(${entendimiento.toFixed(2)}%)`)
        }
        //console.log("nuevo desnormalizado",messagesInfo)
    fetch('./messagesPool.hbs').then(response => {
        response.text().then((plantillamensajes) => {
            const template = Handlebars.compile(plantillamensajes);
            let html = template({ messagesInfo });
            //console.log(html)
            $("#messangesPool").html(html)
            titleInput.value = ""
            priceInput.value = ""
            imgPool.value = ""
        })
    })
    }
}

messageForm.addEventListener('submit', event => {
    event.preventDefault()
    if (emailInput.value == "") {
        alert('Ingresar correo para participar en el chat.')
        return
    }
    if (messageInput.value == "") {
        alert('Ingresar un mensaje.')
        return
    }

    const now = new Date()
    const fecha = now.toLocaleDateString("es-MX")
    const horas = (" " +
            ("0" + now.getHours()).slice(-2) + ":" +
            ("0" + now.getMinutes()).slice(-2) + ":" +
            ("0" + now.getSeconds()).slice(-2))
        //console.log(now.toLocaleDateString("es-MX"));
        //console.log(horas);

    const messageInfo = {
            author: {
                id: emailInput.value,
                nombre: nombreInput.value,
                apellido: apellidoInput.value,
                edad: edadInput.value,
                alias: aliasInput.value,
                avatar: avatarInput.value,
            },
            horaenvio: fecha + horas,
            text: messageInput.value
        }
        //console.log(messageInfo)
    sendMessage(messageInfo)
    messageInput.value = ""
})


socket.on('server:mensajes', renderMessage)
    //renderProductos({ title: "Nuevo Titulo", price: "50.2", thumbnail: "nueva imagen" })

