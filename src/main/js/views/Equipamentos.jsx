import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {EquipamentosController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class Equipamentos extends Component {
    componentDidMount = () => EquipamentosController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome da Equipamento" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
            </tr>,

        body: (equipamento) =>
            <tr>
                <td>{equipamento.id}</td>
                <td>{equipamento.nome}</td>
                <td>{equipamento.descricao}</td>
            </tr>
    }

    formSchema = (equipamento) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12}><Input type="text" label="Nome" placeholder="Nome da equipamento" name="nome" defaultValue={equipamento.nome} autoFocus/></Col>
		        </Row>
		        <Row className="show-grid">
		          	<Col xs={12}><Input type="text" label="Descrição" placeholder="Descrição" name="descricao" defaultValue={equipamento.sigla}/></Col>
		        </Row>
	      </Grid>
        </div>

    render = () =>
        <Crud title="Equipamentos"
              controller={EquipamentosController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Equipamentos