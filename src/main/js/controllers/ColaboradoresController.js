import Controller from './Controller'
import {Request} from '../helpers'

class ColaboradoresController extends Controller {
    state = {
        allColaboradores: [],
        colaboradores: [],
        colaborador: {},
        showForm: false,

        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    }

    list = (page) => {
        Request.get('/api/colaboradores/', {count:5, page: page}).then(({list, totalPages}) =>
            this.dispatch({
                colaboradores: list,
                currentPage: page || 1,
                showForm: false,
                totalPages: totalPages
            }))
    }

    load = (id) => {
        Request.get(`/api/colaboradores/${id}`).then(colaborador =>
            this.dispatch({
                colaborador,
                showForm: true
            }))
    }

    save = (colaborador) => {
        colaborador.id ?
            Request.put(`/api/colaboradores/${colaborador.id}`, colaborador).then(() => this.list()):
            Request.post('/api/colaboradores', colaborador).then(() => this.list())
    }

    remove = (id) => {
        if(confirm("Confirma remoção?"))
            Request.del(`/api/colaboradores/${id}`).then(() => this.list())
    }

    filter = (searchQuery) => {
        searchQuery = searchQuery || "";

        const {allColaboradores} = this.state; // equivale a "const allColaboradores = this.state.allColaboradores"

        searchQuery =  searchQuery.toLowerCase().trim();
        let colaboradoresFiltered = allColaboradores.filter(
                colaborador => colaborador.nome.toLowerCase().indexOf(searchQuery) > -1
        )

        colaboradoresFiltered = paginate(colaboradoresFiltered, this.state.pageSize, 1);
        this.dispatch({colaboradores: colaboradoresFiltered});
    }

    blank = () => {
        this.dispatch({colaborador: {}, showForm: true})
    }

    closeForm = () => {
        this.dispatch({colaborador: {}, showForm: false})
    }
}

export default new ColaboradoresController()
