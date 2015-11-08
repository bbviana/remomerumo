import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class AvaliacoesClinicasController extends CrudController {
    constructor(){
        super("avaliacoesClinicas")
    }
}

export default new AvaliacoesClinicasController()
