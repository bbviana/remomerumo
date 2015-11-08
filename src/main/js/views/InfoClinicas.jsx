import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {InfoClinicasController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class InfoClinicas extends Component {
    componentDidMount = () => InfoClinicasController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome da Informação Clinica" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Sigla</th>
            </tr>,

        body: (infoClinica) =>
            <tr>
                <td>{infoClinica.id}</td>
                <td>{infoClinica.nome}</td>
                <td>{infoClinica.sigla}</td>
            </tr>
    }

    formSchema = (infoClinica) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12}><Input type="text" label="Nome" placeholder="Nome completo da Informação Clinica" name="nome" defaultValue={infoClinica.nome} autoFocus/></Col>
		        </Row>
		        <Row className="show-grid">
		          	<Col xs={12}><Input type="text" label="Sigla" placeholder="Sigla" name="sigla" defaultValue={infoClinica.sigla} autoFocus/></Col>
		        </Row>
	      </Grid>
        </div>

    render = () =>
        <Crud title="Informação Clinica"
              controller={InfoClinicasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default InfoClinicas