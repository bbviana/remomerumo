import Controller from './Controller'
import {Request} from '../helpers'

class TipoAtividadesController extends Controller {
    state = {
        allTipoAtividades: [],
        tipoAtividades: [],
        atividade: {},
        showForm: false,

        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    }

    list = (page) => {
        Request.get('/api/tipoAtividades/', {count:5, page: page}).then(({list, totalPages}) =>
            this.dispatch({
                tipoAtividades: list,
                currentPage: page || 1,
                showForm: false,
                totalPages: totalPages
            }))
    }

    load = (id) => {
        Request.get(`/api/tipoAtividades/${id}`).then(atividade =>
            this.dispatch({
                atividade,
                showForm: true
            }))
    }

    save = (atividade) => {
        atividade.id ?
            Request.put(`/api/tipoAtividades/${atividade.id}`, atividade).then(() => this.list()):
            Request.post('/api/tipoAtividades', atividade).then(() => this.list())
    }

    remove = (id) => {
        if(confirm("Confirma remoção?"))
            Request.del(`/api/tipoAtividades/${id}`).then(() => this.list())
    }

    filter = (searchQuery) => {
        searchQuery = searchQuery || "";

        const {allTipoAtividadTipoAtividades.state; // equivale a "const allTipoAtividades = this.state.allTipoAtividades"

        searchQuery =  searchQuery.toLowerCase().trim();
        let tipoAtividadesFiltered = allAtividades.filter(
                atividade => atividade.nome.toLowerCase().indexOf(searchQuery) > -1
        )

        tipoAtividadesFiltered = paginate(tipoAtividadesFiltered, this.state.pageSize, 1);
        this.dispatch({tipoAtividades: tipoAtividadesFiltered});
    }

    blank = () => {
        this.dispatch({atividade: {}, showForm: true})
    }

    closeForm = () => {
        this.dispatch({atividade: {}, showForm: false})
    }
}