import Controller from './Controller'
import {Request} from '../helpers'

class ResponsaveisController extends Controller {
    state = {
        allResponsaveis: [],
        responsaveis: [],
        responsavel: {},
        showForm: false,

        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    }

    list = (page) => {
        Request.get('/api/responsaveis/', {count:5, page: page}).then(({list, totalPages}) =>
            this.dispatch({
                responsaveis: list,
                currentPage: page || 1,
                showForm: false,
                totalPages: totalPages
            }))
    }

    load = (id) => {
        Request.get(`/api/responsaveis/${id}`).then(responsavel =>
            this.dispatch({
                responsavel,
                showForm: true
            }))
    }

    save = (responsavel) => {
        responsavel.id ?
            Request.put(`/api/responsaveis/${responsavel.id}`, responsavel).then(() => this.list()):
            Request.post('/api/responsaveis', responsavel).then(() => this.list())
    }

    remove = (id) => {
        if(confirm("Confirma remoção?"))
            Request.del(`/api/responsaveis/${id}`).then(() => this.list())
    }

    filter = (searchQuery) => {
        searchQuery = searchQuery || "";

        const {allResponsaveis} = this.state; // equivale a "const allResponsaveis = this.state.allResponsaveis"

        searchQuery =  searchQuery.toLowerCase().trim();
        let responsaveisFiltered = allResponsaveis.filter(
                responsavel => responsavel.nome.toLowerCase().indexOf(searchQuery) > -1
        )

        responsaveisFiltered = paginate(responsaveisFiltered, this.state.pageSize, 1);
        this.dispatch({responsaveis: responsaveisFiltered});
    }

    blank = () => {
        this.dispatch({responsavel: {}, showForm: true})
    }

    closeForm = () => {
        this.dispatch({responsavel: {}, showForm: false})
    }
}

export default new ResponsaveisController()
