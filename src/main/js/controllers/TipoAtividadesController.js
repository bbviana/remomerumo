import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class TipoAtividadesController extends CrudController {
    constructor() {
        super("tipoAtividades")
    }
}

export default new TipoAtividadesController()

