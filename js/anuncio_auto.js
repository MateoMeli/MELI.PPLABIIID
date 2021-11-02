import { Anuncio } from "./anuncio.js"
export class Anuncio_auto extends Anuncio{
    constructor(id, titulo, transaccion, descripcion, precio, puertas, kilometros, potencia){
        super(id, titulo, transaccion, descripcion, precio)
        this.puertas = puertas
        this.kilometros = kilometros
        this.potencia = potencia
    }
}