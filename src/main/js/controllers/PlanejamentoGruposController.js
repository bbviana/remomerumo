import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class PlanejamentoGruposController extends CrudController {
    constructor(){
        super("planejamentoGrupos")
    }
}

export default new PlanejamentoGruposController()