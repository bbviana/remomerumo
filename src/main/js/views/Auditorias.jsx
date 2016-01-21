import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {PermissoesController} from '../controllers'
import {Input, Row, Col, Grid, Panel, Glyphicon, Button} from 'react-bootstrap';

class Auditorias extends Component {
    componentDidMount = () => AuditoriasController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por Entidade" autoComplete="off"
               name="entidade" degaultValue={search.entidade}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Entidade</th>
                <th>Operação</th>
            </tr>,

        body: (auditoria) =>
            <tr>
                <td>{auditoria.id}</td>
                <td>{auditoria.usuario.nome}</td>
                <td>{auditoria.entidade}</td>
                <td>{auditoria.tipoOperacao}</td>
            </tr>
            
    }

    formSchema = (permissao) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		        	<Col xs={12} md={6}><Input type="text" label="Nome" placeholder="Login do usuário" name="nome" defaultValue={permissao.nome} autoFocus/></Col>
		          	<Col xs={12} md={6}><Input type="text" label="Descrição" placeholder="Descrição" name="descricao" defaultValue={permissao.descricao}/></Col>
		        </Row>
	      </Grid>
        </div>

    render = () =>
        <Crud title="auditoria"
              controller={AuditoriasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Auditorias