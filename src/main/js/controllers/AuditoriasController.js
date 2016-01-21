import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class AuditoriasController extends CrudController {
    constructor(){
        super("auditorias")
    }
}

export default new AuditoriasController()

