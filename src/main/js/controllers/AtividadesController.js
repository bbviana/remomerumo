import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class AtividadesController extends CrudController {
    constructor(){
        super("atividades")
    }
}

export default new AtividadesController()

