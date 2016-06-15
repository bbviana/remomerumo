import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {AuditoriasController} from '../controllers'
import {Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid, Panel, Glyphicon, Button} from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker';

class Auditorias extends Component {
    componentDidMount = () => AuditoriasController.list() // Busca inicial

    searchSchema = (search) =>
        <FormControl type="text" placeholder="Buscar por Entidade" autoComplete="off"
               name="nome" defaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Entidade</th>
                <th>Operação</th>
                <th>Data</th>
            </tr>,

        body: (auditoria) =>
            <tr>
                <td>{auditoria.id}</td>
                <td>{auditoria.usuario.nome}</td>
                <td>{auditoria.nome}</td>
                <td>{auditoria.tipoOperacao}</td>
                <td>{auditoria.dataRegistroFormatada}</td>
            </tr>
            
    }

    formSchema = (auditoria) =>
        <div>
        <FormGroup controlId="data_pki">
	        <Grid fluid>
		        <Row className="show-grid">
		        	<Col xs={12} md={6}><ControlLabel>Nome</ControlLabel><FormControl type="text" disabled name="nome" defaultValue={auditoria.nome}/></Col>
		        	<Col xs={12} md={6}>
			        	
		    				<ControlLabel>Data de Registro</ControlLabel>
		    				<DatePicker placeholder="dd/mm/aaaa" value={avaliacaoClinica.dataRegistro} name="dataRegistro" onChange={(value) => {AuditoriasController.state.form.dataRegistro=value}} />
		    			</Col>
		        </Row>
		        <Row className="show-grid">
		        	<Col xs={12} md={12}><ControlLabel>Descrição</ControlLabel><FormControl  componentClass="textarea" disabled label="Descrição" placeholder="Descrição" name="registro" defaultValue={auditoria.registro}/></Col>
		        </Row>
	      </Grid>
	      </FormGroup>
        </div>

    render = () =>
        <Crud title="Auditoria"
              controller={AuditoriasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Auditorias