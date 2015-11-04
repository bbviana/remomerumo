import Controller from './Controller'
import {Request} from '../helpers'

class ResponsaveisController extends Controller {
    state = {
        responsaveis: [],
        responsavel: {},
        search: {},
        showForm: false,

        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    }

    list = (args = {}) => {
        const page = args.page || 1;
        const pageSize = args.pageSize || this.state.pageSize;

        Request.get('api/responsaveis/', {count:pageSize, page: page, "search.nome": this.state.search.nome}).then(({list, totalPages}) =>
            this.dispatch({
                responsaveis: list,
                showForm: false,

                currentPage: page,
                pageSize: pageSize,
                totalPages: totalPages
            }))
    }

    load = (id) => {
        id ?
            Request.get(`api/responsaveis/${id}`).then(responsavel => this.dispatch({responsavel: responsavel, showForm: true})):
            this.dispatch({responsavel: {}, showForm: true})
    }

    save = () => {
        const {responsavel} =  this.state;
        responsavel.id ?
            Request.put(`api/responsaveis/${responsavel.id}`, responsavel).then(() => this.list()):
            Request.post('api/responsaveis', responsavel).then(() => this.list())
    }

    remove = (id) => {
        if(confirm("Confirma remoção?"))
            Request.del(`api/responsaveis/${id}`).then(() => this.list())
    }


    closeForm = () => {
        this.dispatch({responsavel: {}, showForm: false})
    }

    changeForm = (newValue) => {
        Object.assign(this.state.responsavel, newValue);
        this.emitChange();
    }

    changeSearch = (newValue) => {
        Object.assign(this.state.search, newValue);
        this.emitChange();
    }
}

export default new ResponsaveisController()

