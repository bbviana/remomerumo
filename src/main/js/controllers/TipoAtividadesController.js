import Controller from './Controller'
import {CrudController} from '../crud'

class TipoAtividadesController extends CrudController {
    constructor() {
        super("tipoAtividades")
    }
}

export default new TipoAtividadesController()

