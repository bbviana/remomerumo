import Controller from './Controller'
import {Request} from '../helpers'

class AlunosController extends Controller {
    state = {
        allAlunos: [],
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
                currentPage: page || 1,
                showForm: false,
                totalPages: totalPages
            }))
    }

    load = (id) => {
        Request.get(`api/alunos/${id}`).then(aluno =>
            this.dispatch({
                aluno,
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

    filter = (searchQuery) => {
        searchQuery = searchQuery || "";

        const {allAlunos} = this.state; // equivale a "const allAlunos = this.state.allAlunos"

        searchQuery =  searchQuery.toLowerCase().trim();
        let alunosFiltered = allAlunos.filter(
                aluno => aluno.nome.toLowerCase().indexOf(searchQuery) > -1
        )

        alunosFiltered = paginate(alunosFiltered, this.state.pageSize, 1);
        this.dispatch({alunos: alunosFiltered});
    }

    blank = () => {
        this.dispatch({aluno: {}, showForm: true})
    }

    closeForm = () => {
        this.dispatch({aluno: {}, showForm: false})
    }
}

export default new AlunosController()

