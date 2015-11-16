import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {TipoAtividadesController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class TipoAtividades extends Component {
    componentDidMount = () => TipoAtividadesController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome do Tipo de Atividade" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
            </tr>,

        body: (tipoAtividade) =>
            <tr>
                <td>{tipoAtividade.id}</td>
                <td>{tipoAtividade.nome}</td>
            </tr>
    }

    formSchema = (tipoAtividade) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12} md={6}><Input type="text" label="Nome" placeholder="Nome do Tipo de Atividade" name="nome" defaultValue={tipoAtividade.nome} autoFocus/></Col>
		        </Row>
	      </Grid>
        </div>

    render = () =>
        <Crud title="Tipo de Atividade"
              controller={TipoAtividadesController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default TipoAtividades