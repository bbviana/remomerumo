import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class AlunosController extends CrudController {
    constructor(){
        super("alunos")
    }
}

export default new AlunosController()

