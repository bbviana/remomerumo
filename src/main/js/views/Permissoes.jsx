import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {PermissoesController} from '../controllers'
import {Input, Row, Col, Grid, Panel, Glyphicon, Button} from 'react-bootstrap';

class Permissoes extends Component {
    componentDidMount = () => PermissoesController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome do usuario" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Login</th>
                <th>Descrição</th>
            </tr>,

        body: (usuario) =>
            <tr>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.descricao}</td>
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
        <Crud title="usuario"
              controller={PermissoesController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Permissoes