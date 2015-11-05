import {Controller, Request} from '../helpers'

class CrudController extends Controller {
    constructor(url){
        super();
        this.url = url;
    }

    state = {
        search: {},

        list: [],

        form: {},
        formAssociations: {},
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
            ({data, paging}) => this.dispatch({
                list: data,
                showForm: false,

                currentPage: paging.page,
                pageSize: paging.pageSize,
                totalPages: paging.totalPages
            }))
    }

    blank = () => {
        Request.get(`api/${this.url}/blank`).then(
            ({data, associations}) => this.dispatch({
                form: data,
                formAssociations: associations,
                showForm: true
            }))
    }

    load = (id) => {
        Request.get(`api/${this.url}/${id}`).then(
            ({data, associations}) => this.dispatch({
                form: data,
                formAssociations: associations,
                showForm: true
            }))
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

