import Controller from './Controller'
import {Request} from '../helpers'

class ColaboradoresController extends Controller {
    state = {
        colaboradores: [],
        colaborador: {},
        search: {},
        showForm: false,

        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    }

    list = (args = {}) => {
        const page = args.page || 1;
        const pageSize = args.pageSize || this.state.pageSize;

        Request.get('api/colaboradores/', {count:pageSize, page: page, "search.nome": this.state.search.nome}).then(({list, totalPages}) =>
            this.dispatch({
                colaboradores: list,
                showForm: false,

                currentPage: page,
                pageSize: pageSize,
                totalPages: totalPages
            }))
    }

    load = (id) => {
        id ?
            Request.get(`api/colaboradores/${id}`).then(colaborador => this.dispatch({colaborador: colaborador, showForm: true})):
            this.dispatch({colaborador: {}, showForm: true})
    }

    save = () => {
        const {colaborador} =  this.state;
        colaborador.id ?
            Request.put(`api/colaboradores/${colaborador.id}`, colaborador).then(() => this.list()):
            Request.post('api/colaboradores', colaborador).then(() => this.list())
    }

    remove = (id) => {
        if(confirm("Confirma remoção?"))
            Request.del(`api/colaboradores/${id}`).then(() => this.list())
    }


    closeForm = () => {
        this.dispatch({colaborador: {}, showForm: false})
    }

    changeForm = (newValue) => {
        Object.assign(this.state.colaborador, newValue);
        this.emitChange();
    }

    changeSearch = (newValue) => {
        Object.assign(this.state.search, newValue);
        this.emitChange();
    }
}

export default new ColaboradoresController()

