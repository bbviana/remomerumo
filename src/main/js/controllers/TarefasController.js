import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class TarefasController extends CrudController {
    constructor(){
        super("tarefas")
    }
}

export default new TarefasController()

