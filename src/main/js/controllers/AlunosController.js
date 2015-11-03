import Controller from './Controller'
import {Request} from '../helpers'

class AlunosController extends Controller {
    state = {
        alunos: [],
        aluno: {},
        search: {},
        showForm: false,

        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    }

    list = (args = {}) => {
        const page = args.page || 1;
        const pageSize = args.pageSize || this.state.pageSize;

        Request.get('api/alunos/', {count:pageSize, page: page, "search.nome": this.state.search.nome}).then(({list, totalPages}) =>
            this.dispatch({
                alunos: list,
                showForm: false,

                currentPage: page,
                pageSize: pageSize,
                totalPages: totalPages
            }))
    }

    load = (id) => {
        id ?
            Request.get(`api/alunos/${id}`).then(aluno => this.dispatch({aluno: aluno, showForm: true})):
            this.dispatch({aluno: {}, showForm: true})
    }

    save = () => {
        const {aluno} =  this.state;
        aluno.id ?
            Request.put(`api/alunos/${aluno.id}`, aluno).then(() => this.list()):
            Request.post('api/alunos', aluno).then(() => this.list())
    }

    remove = (id) => {
        if(confirm("Confirma remoção?"))
            Request.del(`api/alunos/${id}`).then(() => this.list())
    }


    closeForm = () => {
        this.dispatch({aluno: {}, showForm: false})
    }

    changeForm = (newValue) => {
        Object.assign(this.state.aluno, newValue);
        this.emitChange();
    }

    changeSearch = (newValue) => {
        Object.assign(this.state.search, newValue);
        this.emitChange();
    }
}

export default new AlunosController()

