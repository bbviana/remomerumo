import Controller from './Controller'
import {Request} from '../helpers'

class AtividadesController extends Controller {
    state = {
        allAtividades: [],
        atividades: [],
        atividade: {},
        showForm: false,

        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    }

    list = (page) => {
        Request.get('/api/atividades/', {count:5, page: page}).then(({list, totalPages}) =>
            this.dispatch({
                atividades: list,
                currentPage: page || 1,
                showForm: false,
                totalPages: totalPages
            }))
    }

    load = (id) => {
        Request.get(`/api/atividades/${id}`).then(atividade =>
            this.dispatch({
                atividade,
                showForm: true
            }))
    }

    save = (atividade) => {
        atividade.id ?
            Request.put(`/api/atividades/${atividade.id}`, atividade).then(() => this.list()):
            Request.post('/api/atividades', atividade).then(() => this.list())
    }

    remove = (id) => {
        if(confirm("Confirma remoção?"))
            Request.del(`/api/atividades/${id}`).then(() => this.list())
    }

    filter = (searchQuery) => {
        searchQuery = searchQuery || "";

        const {allAtividades} = this.state; // equivale a "const allAtividades = this.state.allAtividades"

        searchQuery =  searchQuery.toLowerCase().trim();
        let atividadesFiltered = allAtividades.filter(
                atividade => atividade.nome.toLowerCase().indexOf(searchQuery) > -1
        )

        atividadesFiltered = paginate(atividadesFiltered, this.state.pageSize, 1);
        this.dispatch({atividades: atividadesFiltered});
    }

    blank = () => {
        this.dispatch({atividade: {}, showForm: true})
    }

    closeForm = () => {
        this.dispatch({atividade: {}, showForm: false})
    }
}