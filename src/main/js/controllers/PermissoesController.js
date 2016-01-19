import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class PermissoesController extends CrudController {
    constructor(){
        super("permissoes")
    }
}

export default new PermissoesController()

