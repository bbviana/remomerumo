import Controller from './Controller'
import {Request} from '../helpers'

class AlunosController extends Controller {
    state = {
        allAlunos: [],
        alunos: [],
        aluno: {},
        showForm: false,

        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    }

    list = () => {
        Request.get('/api/alunos/').then(alunos => this.dispatch({
            allAlunos: alunos,
            alunos: paginate(alunos, this.state.pageSize, 1),
            currentPage: 1,
            showForm: false,
            totalPages: totalPages(alunos, this.state.pageSize)
        }))
    }

    load = (id) => {
        Request.get(`/api/alunos/${id}`).then(aluno => this.dispatch({aluno, showForm: true}))
    }

    save = (aluno) => {
        aluno.id ?
            Request.put(`/api/alunos/${aluno.id}`, aluno).then(this.list):
            Request.post('/api/alunos', aluno).then(this.list)
    }

    remove = (id) => {
        confirm("Confirma remoção?") ? Request.delete(`/api/alunos/${id}`).then(this.list) : null
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

    goToPage = (page) => {
        const alunos  = paginate(this.state.allAlunos, this.state.pageSize, page);
        this.dispatch({alunos: alunos, currentPage: page});
    }

    blank = () => {
        this.dispatch({aluno: {}, showForm: true})
    }

    closeForm = () => {
        this.dispatch({aluno: {}, showForm: false})
    }
}

function paginate(array, pageSize, page) {
    const firstIndex = (page - 1) * pageSize
    return array.slice(firstIndex, firstIndex + pageSize);
}

function totalPages(array, pageSize){
    return Math.ceil(array.length / pageSize);
}

export default new AlunosController()
