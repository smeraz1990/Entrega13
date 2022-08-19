const TIEMPO_EXPIRACION = 600000;
const URL_BASE_DE_DATOS = 'mongodb://localhost:27017/coderhouse';
const mongoOptions = {useNewUrlParser: true, useUnifiedTopology:true}
const URL_BASE_DE_DATOS_ATLAS = `mongodb+srv://saymon:saymon123456@cluster0.pxiaw.mongodb.net/?retryWrites=true&w=majority',${mongoOptions}`

export default  {
	TIEMPO_EXPIRACION,
	URL_BASE_DE_DATOS,
	URL_BASE_DE_DATOS_ATLAS
}
