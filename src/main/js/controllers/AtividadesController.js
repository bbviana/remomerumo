import Controller from './Controller'
import {Request} from '../helpers'

class AtividadesController extends Controller {
    state = {
        atividades: [],
        atividade: {},
        search: {},
        showForm: false,

        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    }

    list = (args = {}) => {
        const page = args.page || 1;
        const pageSize = args.pageSize || this.state.pageSize;

        Request.get('api/atividades/', {count:pageSize, page: page, "search.nome": this.state.search.nome}).then(({list, totalPages}) =>
            this.dispatch({
                atividades: list,
                showForm: false,

                currentPage: page,
                pageSize: pageSize,
                totalPages: totalPages
            }))
    }

    load = (id) => {
        id ?
            Request.get(`api/atividades/${id}`).then(atividade => this.dispatch({atividade: atividade, showForm: true})):
            this.dispatch({atividade: {}, showForm: true})
    }

    save = () => {
        const {atividade} =  this.state;
        atividade.id ?
            Request.put(`api/atividades/${atividade.id}`, atividade).then(() => this.list()):
            Request.post('api/atividades', atividade).then(() => this.list())
    }

    remove = (id) => {
        if(confirm("Confirma remoção?"))
            Request.del(`api/atividades/${id}`).then(() => this.list())
    }


    closeForm = () => {
        this.dispatch({atividade: {}, showForm: false})
    }

    changeForm = (newValue) => {
        Object.assign(this.state.atividade, newValue);
        this.emitChange();
    }

    changeSearch = (newValue) => {
        Object.assign(this.state.search, newValue);
        this.emitChange();
    }
}

export default new AtividadesController()

