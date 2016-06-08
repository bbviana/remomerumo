import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class EspecialidadeClinicasController extends CrudController {
    constructor(){
        super("especialidadeClinicas")
    }
}

export default new EspecialidadeClinicasController()

