import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {ResponsaveisController} from '../controllers'
import {Input, Checkbox, FormControl, FormGroup, ControlLabel, Row, Col, Grid} from 'react-bootstrap';

class Responsaveis extends Component {
    componentDidMount = () => ResponsaveisController.list() // Busca inicial

    searchSchema = (search) =>
        <FormControl type="text" placeholder="Buscar por nome do Responsável" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ativo?</th>
            </tr>,

        body: (responsavel) =>
            <tr>
                <td>{responsavel.id}</td>
                <td>{responsavel.nome}</td>
				<td>{responsavel.email}</td>
                <td>{responsavel.telefone}</td>
                <td>{responsavel.ativo?"Sim":"Não"}</td>
            </tr>
    }

    formSchema = (responsavel) =>
        <div>
        	<FormGroup controlId="formControlsFile">
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12} md={6}><ControlLabel>Nome</ControlLabel><FormControl type="text" placeholder="Nome completo do responsavel" name="nome" defaultValue={responsavel.nome} autoFocus/></Col>
		          	<Col xs={12} md={6}><ControlLabel>Apelido</ControlLabel><FormControl type="text" name="apelido" defaultValue={responsavel.apelido} placeholder="Apelido"  /></Col>
		        </Row>
		
		        <Row className="show-grid">
		          	<Col xs={12} md={6}><ControlLabel>Natural de</ControlLabel><FormControl type="text" name="naturalDe" defaultValue={responsavel.naturalDe} placeholder="Cidade - estado"  /></Col>
		          	<Col xs={12} md={6}><ControlLabel>Data de nascimento</ControlLabel><FormControl type="text" name="dtNasc" defaultValue={responsavel.dtNasc} placeholder="dd/mm/aaaa"  /></Col>
		        </Row>
		
		        <Row className="show-grid">
		        	<Col xs={12} md={6}><ControlLabel>CPF</ControlLabel><FormControl type="text" name="cpf" defaultValue={responsavel.cpf} placeholder="Documento CPF"  /></Col>
		        	<Col xs={12} md={6}><ControlLabel>RG</ControlLabel><FormControl type="text" name="rg" defaultValue={responsavel.rg} placeholder="Documento RG"  /></Col>
		        </Row>
		        <Row className="show-grid">	
		        	<Col xs={12}><ControlLabel>Endereco</ControlLabel><FormControl type="text" name="endereco" defaultValue={responsavel.endereco} placeholder="Rua, número"  /></Col>
		       </Row>
		
		        <Row className="show-grid">
		        	<Col xs={12} md={4}><ControlLabel>Celular</ControlLabel><FormControl type="text" name="email" defaultValue={responsavel.email} placeholder="Email para contato"  /></Col>
		        	<Col xs={12} md={4}><ControlLabel>Telefone</ControlLabel><FormControl type="text" name="telefone" defaultValue={responsavel.telefone} placeholder="Telefone Fixo"  /></Col>
		        	<Col xs={12} md={4}><ControlLabel>Email</ControlLabel><FormControl type="text" name="celular" defaultValue={responsavel.celular} placeholder="Celular com ddd"  /></Col>
		        </Row>
		        <Row className="show-grid">	
		        	<Col xs={12} md={4}><ControlLabel>Sapato</ControlLabel><FormControl type="text" name="sapato" defaultValue={responsavel.sapato} placeholder="Tamanho da sapato"  /></Col>
		        	<Col xs={12} md={4}><ControlLabel>Bermuda</ControlLabel><FormControl type="text" name="bermuda" defaultValue={responsavel.bermuda} placeholder="Tamanho da bermuda"  /></Col>
		        	<Col xs={12} md={4}><ControlLabel>Camiseta</ControlLabel><FormControl type="text" name="camiseta" defaultValue={responsavel.camiseta} placeholder="Tamanho da camiseta"  /></Col>
		        </Row>
		        <Row className="show-grid">	
    				<Col xs={12}><ControlLabel>Ativo</ControlLabel><Checkbox name="ativo" defaultChecked={responsavel.ativo} /></Col>
    			</Row>
	      </Grid>
	      </FormGroup>
        </div>

    render = () =>
        <Crud title="Responsável"
              controller={ResponsaveisController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Responsaveis