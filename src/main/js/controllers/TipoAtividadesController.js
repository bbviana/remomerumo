import Controller from './Controller'
import {Request} from '../helpers'

class TipoAtividadesController extends Controller {
    state = {
        tipoAtividades: [],
        tipoAtividade: {},
        search: {},
        showForm: false,

        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    }

    list = (args = {}) => {
        const page = args.page || 1;
        const pageSize = args.pageSize || this.state.pageSize;

        Request.get('api/tipoAtividades/', {count:pageSize, page: page, "search.nome": this.state.search.nome}).then(({list, totalPages}) =>
            this.dispatch({
                tipoAtividades: list,
                showForm: false,

                currentPage: page,
                pageSize: pageSize,
                totalPages: totalPages
            }))
    }

    load = (id) => {
        id ?
            Request.get(`api/tipoAtividades/${id}`).then(tipoAtividade => this.dispatch({tipoAtividade: tipoAtividade, showForm: true})):
            this.dispatch({tipoAtividade: {}, showForm: true})
    }

    save = () => {
        const {tipoAtividade} =  this.state;
        tipoAtividade.id ?
            Request.put(`api/tipoAtividades/${tipoAtividade.id}`, tipoAtividade).then(() => this.list()):
            Request.post('api/tipoAtividades', tipoAtividade).then(() => this.list())
    }

    remove = (id) => {
        if(confirm("Confirma remoção?"))
            Request.del(`api/tipoAtividades/${id}`).then(() => this.list())
    }


    closeForm = () => {
        this.dispatch({tipoAtividade: {}, showForm: false})
    }

    changeForm = (newValue) => {
        Object.assign(this.state.tipoAtividade, newValue);
        this.emitChange();
    }

    changeSearch = (newValue) => {
        Object.assign(this.state.search, newValue);
        this.emitChange();
    }
}

export default new TipoAtividadesController()

