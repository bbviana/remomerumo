import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {UsuariosController} from '../controllers'
import {Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid, Panel, Glyphicon, Button} from 'react-bootstrap';

class Usuarios extends Component {
    componentDidMount = () => UsuariosController.list() // Busca inicial

    searchSchema = (search) =>
        <FormControl type="text" placeholder="Buscar por nome do usuario" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Login</th>
                <th>Colaborador</th>
            </tr>,

        body: (usuario) =>
            <tr>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.colaborador.nome}</td>
            </tr>
            
    }

    formSchema = (usuario, {colaboradores = [], permissoes = []}) =>
        <div>
        <FormGroup controlId="formControlsFile">
	        <Grid fluid>
		        <Row className="show-grid">
		        	<Col xs={12} md={6}><ControlLabel>Nome</ControlLabel><FormControl type="text" placeholder="Login do usuário" name="nome" defaultValue={usuario.nome} autoFocus/></Col>
		          	<Col xs={12} md={6}><ControlLabel>Senha</ControlLabel><FormControl type="password" placeholder="Senha" name="senha" defaultValue={usuario.senha}/></Col>
		        </Row>
		        <Row className="show-grid">	
	        	<Col xs={12}>
	        	<ControlLabel>Colaboradores</ControlLabel>
		        	<FormControl componentClass="select" name="colaborador"
			                defaultValue={id(usuario.colaborador)} onChange={handleAssociationChange}>
			            <option value="">Selecione...</option>
			            {colaboradores.map((element, i) =>
			                <option key={i} value={element.id}>{element.nome}</option>
			            )}
		            </FormControl>
	            </Col>
            </Row>
            <Row className="show-grid">	
        	<Col xs={12}>
        		<ControlLabel>Permissões</ControlLabel>
        		<FormControl componentClass="select" name="permissoes"
                       defaultValue={ids(usuario.permissoes)} onChange={handleAssociationChange} multiple>
                    <option value="">Selecione...</option>
                    {permissoes.map((element, i) =>
                        <option key={i} value={element.id}>{element.nome}</option>
                    )}
                </FormControl>
    	        </Col>
            </Row>
	      </Grid>
	      </FormGroup>
        </div>

    render = () =>
        <Crud title="usuario"
              controller={UsuariosController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Usuarios