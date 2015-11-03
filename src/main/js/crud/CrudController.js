import {Controller, Request} from '../helpers'

class CrudController extends Controller {
    constructor(url){
        super();
        this.url = url;
    }

    state = {
        list: [],
        form: {},
        search: {},
        showForm: false,

        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    }

    list = (args = {}) => {
        const page = args.page || 1;
        const pageSize = args.pageSize || this.state.pageSize;
        const query = {
            count:pageSize,
            page: page,
            "search.nome": this.state.search.nome
        };

        Request.get(`api/${this.url}/`, query).then(
            ({list, totalPages}) => this.dispatch({
                list: list,
                showForm: false,

                currentPage: page,
                pageSize: pageSize,
                totalPages: totalPages
            }))
    }

    load = (id) => {
        if(id) {
            Request.get(`api/${this.url}/${id}`).then(
                form => this.dispatch({
                form: form,
                showForm: true
            }))
        } else {
            this.dispatch({
                form: {},
                showForm: true
            })
        }
    }

    save = () => {
        const {form} =  this.state;
        if(form.id) {
            Request.put(`api/${this.url}/${form.id}`, form).then(() => this.list())
        } else {
            Request.post(`api/${this.url}`, form).then(() => this.list())
        }
    }

    remove = (id) => {
        if(confirm("Confirma remoção?"))
            Request.del(`api/${this.url}/${id}`).then(() => this.list())
    }


    closeForm = () => {
        this.dispatch({form: {}, showForm: false})
    }

    changeForm = (newValue) => {
        Object.assign(this.state.form, newValue);
        this.emitChange();
    }

    changeSearch = (newValue) => {
        Object.assign(this.state.search, newValue);
        this.emitChange();
    }
}

export default CrudController

