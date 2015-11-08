import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class InfoClinicasController extends CrudController {
    constructor(){
        super("infoClinicas")
    }
}

export default new InfoClinicasController()

