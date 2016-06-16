import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {ColaboradoresController} from '../controllers'
import {Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid, Checkbox, DatePicker} from 'react-bootstrap';

class Colaboradores extends Component {
    componentDidMount = () => ColaboradoresController.list() // Busca inicial

    searchSchema = (search) =>
        <FormControl type="text" placeholder="Buscar por nome do Colaborador" autoComplete="off"
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

        body: (colaborador) =>
            <tr>
                <td>{colaborador.id}</td>
                <td>{colaborador.nome}</td>
				<td>{colaborador.email}</td>
                <td>{colaborador.telefone}</td>
                <td>{colaborador.ativo?"Sim":"Não"}</td>
            </tr>
    }

    formSchema = (colaborador, {responsaveis = []}) =>
        <div>
        <FormGroup controlId="formControlsFile">
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12} md={6}><ControlLabel>Nome</ControlLabel><FormControl type="text" placeholder="Nome completo do colaborador" name="nome" defaultValue={colaborador.nome} autoFocus/></Col>
		          	<Col xs={12} md={6}><ControlLabel>Apelido</ControlLabel><FormControl type="text" name="apelido" defaultValue={colaborador.apelido} placeholder="Apelido"  /></Col>
		        </Row>
		
		        <Row className="show-grid">
	          		<Col xs={12} md={4}><ControlLabel>Área de trabalho</ControlLabel><FormControl type="text" name="areaColaborador" defaultValue={colaborador.naturalDe} placeholder="Colaborador trabalha em.."  /></Col>
		        	<Col xs={12} md={4}><ControlLabel>CPF</ControlLabel><FormControl type="text" name="cpf" defaultValue={colaborador.cpf} placeholder="Documento CPF"  /></Col>
		        	<Col xs={12} md={4}><ControlLabel>RG</ControlLabel><FormControl type="text" name="rg" defaultValue={colaborador.rg} placeholder="Documento RG"  /></Col>
	          	</Row>
		        
		        <Row className="show-grid">
		          	<Col xs={12} md={6}><ControlLabel>Natural de</ControlLabel><FormControl type="text" name="naturalDe" defaultValue={colaborador.naturalDe} placeholder="Cidade - estado"  /></Col>
		          	<Col xs={12} md={6}>
		          		<ControlLabel>Data de Nascimento</ControlLabel>
    				</Col>
		        </Row>
		        
		        <Row className="show-grid">	
		        	<Col xs={12}><ControlLabel>Endereco</ControlLabel><FormControl type="text" name="endereco" defaultValue={colaborador.endereco} placeholder="Rua, número"  /></Col>
		        </Row>
		
		        <Row className="show-grid">
		        	<Col xs={12} md={4}><ControlLabel>Email</ControlLabel><FormControl type="text" name="email" defaultValue={colaborador.email} placeholder="Email para contato"  /></Col>
		        	<Col xs={12} md={4}><ControlLabel>Telefone</ControlLabel><FormControl type="text" name="telefone" defaultValue={colaborador.telefone} placeholder="Telefone Fixo"  /></Col>
		        	<Col xs={12} md={4}><ControlLabel>Celular</ControlLabel><FormControl type="text" name="celular" defaultValue={colaborador.celular} placeholder="Celular com ddd"  /></Col>
		        </Row>
		        <Row className="show-grid">	
		        	<Col xs={12} md={4}><ControlLabel>Sapato</ControlLabel><FormControl type="text" name="sapato" defaultValue={colaborador.sapato} placeholder="Tamanho da sapato"  /></Col>
		        	<Col xs={12} md={4}><ControlLabel>Bermuda</ControlLabel><FormControl type="text" name="bermuda" defaultValue={colaborador.bermuda} placeholder="Tamanho da bermuda"  /></Col>
		        	<Col xs={12} md={4}><ControlLabel>Camiseta</ControlLabel><FormControl type="text" name="camiseta" defaultValue={colaborador.camiseta} placeholder="Tamanho da camiseta"  /></Col>
		        </Row>
		        <Row className="show-grid">	
		        	<Col xs={8}>
		        		<ControlLabel>Responsável</ControlLabel>
			        	<FormControl componentClass="select" name="responsavel"
				                defaultValue={id(colaborador.responsavel)} onChange={handleAssociationChange}>
				            <option value="">Selecione...</option>
				            {responsaveis.map((element, i) =>
				                <option key={i} value={element.id}>{element.nome}</option>
				            )}
			            </FormControl>
		            </Col>
    				<Col xs={4}><ControlLabel>Ativo</ControlLabel><Checkbox name="ativo" defaultChecked={colaborador.ativo} label="Ativo" /></Col>
    			</Row>
	      </Grid>
	      </FormGroup>
        </div>

    render = () =>
        <Crud title="Colaborador"
              controller={ColaboradoresController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Colaboradores