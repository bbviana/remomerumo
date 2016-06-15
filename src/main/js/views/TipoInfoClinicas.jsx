import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {TipoInfoClinicasController} from '../controllers'
import {Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid} from 'react-bootstrap';

class TipoInfoClinicas extends Component {
    componentDidMount = () => TipoInfoClinicasController.list() // Busca inicial

    searchSchema = (search) =>
        <FormControl type="text" placeholder="Buscar por nome da Medida" autoComplete="off"
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

    formSchema = (tipoInfoClinica, {especialidades = []}) =>
        <div>
	        <FormGroup controlId="formControlsFile">
		        <Grid fluid>
			        <Row className="show-grid">
			          	<Col xs={12}><ControlLabel>Nome</ControlLabel><FormControl type="text" placeholder="Nome completo da Medida" name="nome" defaultValue={tipoInfoClinica.nome} autoFocus/></Col>
			        </Row>
			        <Row className="show-grid">
			          	<Col xs={12}><ControlLabel>Sigla</ControlLabel><FormControl type="text" placeholder="Sigla" name="sigla" defaultValue={tipoInfoClinica.sigla}/></Col>
			        </Row>
			        <Row className="show-grid">	
		        	<Col xs={12}>
		             	<ControlLabel>Especialidade</ControlLabel>
			            <FormControl componentClass="select" name="especialidade" defaultValue={id(tipoInfoClinica.especialidade)} onChange={handleAssociationChange}>
				            <option value="">Selecione...</option>
				            {especialidades.map((element, i) =>
				                <option key={i} value={element.id}>{element.nome}</option>
				            )}
				         </FormControl>
		            </Col>
		        </Row>
		      </Grid>
	      </FormGroup>
        </div>

    render = () =>
        <Crud title="Medida"
              controller={TipoInfoClinicasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default TipoInfoClinicas