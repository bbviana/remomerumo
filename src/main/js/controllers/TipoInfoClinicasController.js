import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class TipoInfoClinicasController extends CrudController {
    constructor(){
        super("tipoInfoClinicas")
    }
}

export default new TipoInfoClinicasController()

