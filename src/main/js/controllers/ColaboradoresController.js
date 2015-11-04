import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class ColaboradoresController extends CrudController {
    constructor(){
        super("colaboradores")
    }
}
export default new ColaboradoresController()

