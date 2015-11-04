import Controller from './Controller'
import {CrudController} from '../crud'

class AtividadesController extends CrudController {
    constructor(){
        super("atividades")
    }
}

export default new AtividadesController()

