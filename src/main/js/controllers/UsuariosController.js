import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class UsuariosController extends CrudController {
    constructor(){
        super("usuarios")
    }
}

export default new UsuariosController()

