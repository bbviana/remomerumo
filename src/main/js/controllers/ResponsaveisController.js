import Controller from './Controller'
import {CrudController} from '../crud'

class ResponsaveisController extends CrudController {
    constructor() {
        super("responsaveis")
    }
}

export default new ResponsaveisController()

