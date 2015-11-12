import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class ModeloAvaliacoesClinicasController extends CrudController {
    constructor(){
        super("modeloAvaliacoesClinicas")
    }
}

export default new ModeloAvaliacoesClinicasController()
