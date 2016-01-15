import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {ColaboradoresController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class Colaboradores extends Component {
    componentDidMount = () => ColaboradoresController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome do Colaborador" autoComplete="off"
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

    formSchema = (colaborador) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12} md={6}><Input type="text" label="Nome" placeholder="Nome completo do colaborador" name="nome" defaultValue={colaborador.nome} autoFocus/></Col>
		          	<Col xs={12} md={6}><Input type="text" name="apelido" defaultValue={colaborador.apelido} label="Apelido" placeholder="Apelido"  /></Col>
		        </Row>
		
		        <Row className="show-grid">
		          	<Col xs={12} md={6}><Input type="text" name="naturalDe" defaultValue={colaborador.naturalDe} label="Natural de" placeholder="Cidade - estado"  /></Col>
		          	<Col xs={12} md={6}><Input type="text" name="dtNasc" defaultValue={colaborador.dtNasc} label="Data de Nascimento" placeholder="dd/mm/aaaa"  /></Col>
		        </Row>
		
		        <Row className="show-grid">
		        	<Col xs={12} md={6}><Input type="text" name="cpf" defaultValue={colaborador.cpf} label="CPF" placeholder="Documento CPF"  /></Col>
		        	<Col xs={12} md={6}><Input type="text" name="rg" defaultValue={colaborador.rg} label="RG" placeholder="Documento RG"  /></Col>
		        </Row>
		        <Row className="show-grid">	
		        	<Col xs={12}><Input type="text" name="endereco" defaultValue={colaborador.endereco} label="Endereço" placeholder="Rua, número"  /></Col>
		       </Row>
		
		        <Row className="show-grid">
		        	<Col xs={12} md={4}><Input type="text" name="email" defaultValue={colaborador.email} label="Email" placeholder="Email para contato"  /></Col>
		        	<Col xs={12} md={4}><Input type="text" name="telefone" defaultValue={colaborador.telefone} label="Telefone" placeholder="Telefone Fixo"  /></Col>
		        	<Col xs={12} md={4}><Input type="text" name="celular" defaultValue={colaborador.celular} label="Celular" placeholder="Celular com ddd"  /></Col>
		        </Row>
		        <Row className="show-grid">	
		        	<Col xs={12} md={4}><Input type="text" name="sapato" defaultValue={colaborador.sapato} label="Sapato" placeholder="Tamanho da sapato"  /></Col>
		        	<Col xs={12} md={4}><Input type="text" name="bermuda" defaultValue={colaborador.bermuda} label="Bermuda" placeholder="Tamanho da bermuda"  /></Col>
		        	<Col xs={12} md={4}><Input type="text" name="camiseta" defaultValue={colaborador.camiseta} label="Camiseta" placeholder="Tamanho da camiseta"  /></Col>
		        </Row>
		        <Row className="show-grid">	
    				<Col xs={12}><Input type="checkbox" name="ativo" defaultChecked={colaborador.ativo} label="Ativo" /></Col>
    			</Row>
	      </Grid>
        </div>

    render = () =>
        <Crud title="Colaborador"
              controller={ColaboradoresController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Colaboradores