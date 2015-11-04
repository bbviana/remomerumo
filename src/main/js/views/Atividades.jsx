import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {AtividadesController} from '../controllers'
import {Input} from 'react-bootstrap';

class Atividades extends Component {
    componentDidMount = () => AtividadesController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome do Atividade" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Comentário</th>
            </tr>,

        body: (atividade) =>
            <tr>
                <td>{atividade.id}</td>
                <td>{atividade.Data}</td>
                <td>{atividade.comentario}</td>
            </tr>
    }

    formSchema = (atividade) =>
        <div>
            <Input type="text" label="Data" placeholder="Data" name="data" defaultValue={atividade.data} autoFocus/>
            <Input type="text" name="comentario" defaultValue={atividade.comentario} label="Comentário" placeholder="Comentário"  />
        </div>

    render = () =>
        <Crud title="Atividade"
              controller={AtividadesController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Atividades