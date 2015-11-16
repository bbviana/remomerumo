import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {TipoInfoClinicasController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class TipoInfoClinicas extends Component {
    componentDidMount = () => TipoInfoClinicasController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome do Tipo da Informação Clinica" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Sigla</th>
            </tr>,

        body: (tipoInfoClinica) =>
            <tr>
                <td>{tipoInfoClinica.id}</td>
                <td>{tipoInfoClinica.nome}</td>
                <td>{tipoInfoClinica.sigla}</td>
            </tr>
    }

    formSchema = (tipoInfoClinica) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12}><Input type="text" label="Nome" placeholder="Nome completo da Informação Clinica" name="nome" defaultValue={tipoInfoClinica.nome} autoFocus/></Col>
		        </Row>
		        <Row className="show-grid">
		          	<Col xs={12}><Input type="text" label="Sigla" placeholder="Sigla" name="sigla" defaultValue={tipoInfoClinica.sigla}/></Col>
		        </Row>
	      </Grid>
        </div>

    render = () =>
        <Crud title="Tipo de Informação Clinica"
              controller={TipoInfoClinicasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default TipoInfoClinicas