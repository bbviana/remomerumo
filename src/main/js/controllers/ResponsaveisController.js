import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class ResponsaveisController extends CrudController {
    constructor() {
        super("responsaveis")
    }
}

export default new ResponsaveisController()

