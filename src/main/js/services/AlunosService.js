import Service from './Service'
import {Request} from '../helpers'

class AlunosService extends Service {
    list = () => Request.get('/api/alunos/').then(alunos => this.dispatch({alunos}))

    find = (id) => Request.get(`/api/alunos/${id}`).then(aluno => this.dispatch({aluno: aluno, showForm: true}))

    create = (aluno) => Request.post('/api/alunos', aluno).then(this.list)

    save = (aluno) => Request.put(`/api/alunos/${aluno.id}`, aluno).then(this.list)

    remove = (id) => Request.delete(`/api/aluno/${id}`).then(this.list)

    showForm = () => this.dispatch({showForm: true})

    closeForm = () => this.dispatch({showForm: false})

    changeAluno = ({target}) => {
        this.dispatch({aluno: false})
    }
}

export default new AlunosService()
