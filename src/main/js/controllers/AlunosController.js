import Controller from './Controller'
import {Request} from '../helpers'

class AlunosController extends Controller {
    state = {
        alunos: [],
        aluno: {},
        showForm: false
    }

    list = () => Request.get('/api/alunos/').then(alunos => this.dispatch({alunos, showForm: false}))

    load = (id) => Request.get(`/api/alunos/${id}`).then(aluno => this.dispatch({aluno, showForm: true}))

    save = (aluno) => {
        aluno.id ?
            Request.put(`/api/alunos/${aluno.id}`, aluno).then(this.list):
            Request.post('/api/alunos', aluno).then(this.list)
    }

    remove = (id) => confirm("Confirma remoção?") ? Request.delete(`/api/alunos/${id}`).then(this.list) : null

    blank = () => this.dispatch({aluno: {}, showForm: true})

    closeForm = () => this.dispatch({aluno: {}, showForm: false})
}

export default new AlunosController()
