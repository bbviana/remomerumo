import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class EquipamentosController extends CrudController {
    constructor(){
        super("equipamentos")
    }
}

export default new EquipamentosController()

