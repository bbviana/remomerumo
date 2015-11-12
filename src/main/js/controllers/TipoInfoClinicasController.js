import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class TipoInfoClinicasController extends CrudController {
    constructor(){
        super("TipoInfoClinicas")
    }
}

export default new TipoInfoClinicasController()

