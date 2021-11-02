import { Anuncio_auto } from "./anuncio_auto.js"

import { crearTabla } from "./dinamicas.js"

const $divTabla = document.getElementById("divTabla")
const anuncios = JSON.parse(localStorage.getItem("anuncios"))|| []
actualizarTabla()

window.addEventListener("click", (e)=>{

    if(e.target.matches("td")){
        let id = e.target.parentElement.dataset.id

        cargarFormulario(anuncios.find((anuncio)=>anuncio.id == id))
    }else if(e.target.matches("#btnDelete")){
        handlerDelete(parseInt($formulario.txtId.value))
        $formulario.reset()
    }

})

function cargarFormulario(anuncio) {
    const {txtId, txtTitulo, rdoTransaccion, txtDescripcion, txtPrecio, txtPuertas, txtKilometros, txtPotencia} = $formulario
    txtId.value = anuncio.id 
    txtTitulo.value = anuncio.nombre
    rdoTransaccion.value = anuncio.nombre
    txtDescripcion.value = anuncio.descripcion
    txtPrecio.value = anuncio.precio
    txtPuertas.value = anuncio.puertas
    txtKilometros.value = anuncio.kilometros
    txtPotencia.value = anuncio.potencia
}

const $formulario = document.forms[0]

$formulario.addEventListener("submit", (e)=>{
    e.preventDefault();

    const {txtId, txtTitulo, rdoTransaccion, txtDescripcion, txtPrecio, txtPuertas, txtKilometros, txtPotencia} = $formulario

    const formAnuncio = new Anuncio_auto(txtId.value, txtTitulo.value, rdoTransaccion.value, txtDescripcion.value, txtPrecio.value, txtPuertas.value, txtKilometros.value, txtPotencia.value)

    if(formAnuncio.id === ''){
        formAnuncio.id = Date.now
        handlerCreate(formAnuncio)
        actualizarStorage(formAnuncio)
        actualizarTabla()
    }else{
        handlerUpdate(formAnuncio)
    }

    $formulario.reset()
})

const handlerCreate = (nuevoAnuncio)=>{

    anuncios.push(nuevoAnuncio)

}

const handlerUpdate = (anuncioEditar)=>{
    let indice = anuncios.findIndex((anuncio)=>{return anuncio.id == anuncioEditar.id})
    anuncios.splice(indice, 1)
    anuncios.push(anuncioEditar)
    actualizarStorage(anuncios)
    actualizarTabla()
}

const handlerDelete = (id)=>{
    let indice = anuncios.findIndex((anuncio)=>{return anuncio.id == id})
    anuncios.splice(indice, 1)
    actualizarStorage(anuncios)
    actualizarTabla()
}


function actualizarTabla (){
    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstElementChild)
    }
    const data = JSON.parse(localStorage.getItem("anuncios"))
    if(data){
        $divTabla.appendChild(crearTabla(data))
    }
}

const actualizarStorage=(data)=>{
    localStorage.setItem("anuncios", JSON.stringify(data))
}
