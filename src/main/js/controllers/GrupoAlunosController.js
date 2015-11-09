import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class GrupoAlunosController extends CrudController {
    constructor(){
        super("grupoAlunos")
    }
}

export default new GrupoAlunosController()
