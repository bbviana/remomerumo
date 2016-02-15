import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class AuditoriaController extends CrudController {
    constructor(){
        super("auditoria")
    }
}

export default new AuditoriaController()

