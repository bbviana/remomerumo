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

    list = ({page, search = {}}) => {
        Request.get('api/alunos/', {count:this.state.pageSize, page: page, "search.nome": search.nome}).then(({list, totalPages}) =>
            this.dispatch({
                alunos: list,
                search: search,
                showForm: false,

                currentPage: page,
                totalPages: totalPages
            }))
    }

    load = (id) => {
        Request.get(`api/alunos/${id}`).then(aluno =>
            this.dispatch({
                aluno: aluno,
                showForm: true
            }))
    }

    save = (aluno) => {
        aluno.id ?
            Request.put(`api/alunos/${aluno.id}`, aluno).then(() => this.list({page: 1})):
            Request.post('api/alunos', aluno).then(() => this.list({page: 1}))
    }

    remove = (id) => {
        if(confirm("Confirma remoção?"))
            Request.del(`api/alunos/${id}`).then(() => this.list({page: 1}))
    }

    blank = () => {
        this.dispatch({aluno: {}, showForm: true})
    }

    closeForm = () => {
        this.dispatch({aluno: {}, showForm: false})
    }
}

export default new AlunosController()

