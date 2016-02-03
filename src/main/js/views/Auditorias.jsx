import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {AuditoriasController} from '../controllers'
import {Input, Row, Col, Grid, Panel, Glyphicon, Button} from 'react-bootstrap';

class Auditorias extends Component {
    componentDidMount = () => AuditoriasController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por Entidade" autoComplete="off"
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
                <td>{auditoria.dataRegistro}</td>
            </tr>
            
    }

    formSchema = (auditoria) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		        	<Col xs={12} md={6}><Input type="text" disabled label="Nome" name="nome" defaultValue={auditoria.nome}/></Col>
		        	<Col xs={12} md={6}><Input type="text" disabled label="dataRegistro" name="dataRegistro" defaultValue={auditoria.dataRegistro} /></Col>
		        </Row>
		        <Row className="show-grid">
		        	<Col xs={12} md={12}><Input type="textarea" disabled label="Descrição" placeholder="Descrição" name="registro" defaultValue={auditoria.registro}/></Col>
		        </Row>
	      </Grid>
        </div>

    render = () =>
        <Crud title="Auditoria"
              controller={AuditoriasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Auditorias