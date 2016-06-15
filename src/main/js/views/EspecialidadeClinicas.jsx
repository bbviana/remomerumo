import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {EspecialidadeClinicasController} from '../controllers'
import {Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid} from 'react-bootstrap';

class EspecialidadeClinicas extends Component {
    componentDidMount = () => EspecialidadeClinicasController.list() // Busca inicial

    searchSchema = (search) =>
        <FormControl type="text" placeholder="Buscar por nome da Especialidade" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
            </tr>,

        body: (especialidadeClinica) =>
            <tr>
                <td>{especialidadeClinica.id}</td>
                <td>{especialidadeClinica.nome}</td>
            </tr>
    }

    formSchema = (especialidadeClinica) =>
        <div>
        	<FormGroup controlId="formControlsFile">
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12}><ControlLabel>Nome</ControlLabel><FormControl type="text" placeholder="Nome completo da Medida" name="nome" defaultValue={especialidadeClinica.nome} autoFocus/></Col>
		        </Row>
	      </Grid>
	      </FormGroup> 
        </div>

    render = () =>
        <Crud title="Especialidade"
              controller={EspecialidadeClinicasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default EspecialidadeClinicas