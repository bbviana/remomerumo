import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {ResponsaveisController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class Responsaveis extends Component {
    componentDidMount = () => ResponsaveisController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome do Responsável" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Celular</th>
            </tr>,

        body: (responsavel) =>
            <tr>
                <td>{responsavel.id}</td>
                <td>{responsavel.nome}</td>
                <td>{responsavel.endereco}</td>
				<td>{responsavel.email}</td>
                <td>{responsavel.telefone}</td>
                <td>{responsavel.celular}</td>
            </tr>
    }

    formSchema = (responsavel) =>
        <div>
	        <Grid fluid="true">
		        <Row className="show-grid">
		          	<Col xs={12} md={6}><Input type="text" label="Nome" placeholder="Nome completo do responsavel" name="nome" defaultValue={responsavel.nome} autoFocus/></Col>
		          	<Col xs={12} md={6}><Input type="text" name="apelido" defaultValue={responsavel.apelido} label="Apelido" placeholder="Apelido"  /></Col>
		        </Row>
		
		        <Row className="show-grid">
		          	<Col xs={12} md={6}><Input type="text" name="naturalDe" defaultValue={responsavel.naturalDe} label="Natural de" placeholder="Cidade - estado"  /></Col>
		          	<Col xs={12} md={6}><Input type="text" name="dtNasc" defaultValue={responsavel.dtNasc} label="Data de Nascimento" placeholder="dd/mm/aaaa"  /></Col>
		        </Row>
		
		        <Row className="show-grid">
		        	<Col xs={12} md={6}><Input type="text" name="cpf" defaultValue={responsavel.cpf} label="CPF" placeholder="Documento CPF"  /></Col>
		        	<Col xs={12} md={6}><Input type="text" name="rg" defaultValue={responsavel.rg} label="RG" placeholder="Documento RG"  /></Col>
		        </Row>
		        <Row className="show-grid">	
		        	<Col xs={12}><Input type="text" name="endereco" defaultValue={responsavel.endereco} label="Endereço" placeholder="Rua, número"  /></Col>
		       </Row>
		
		        <Row className="show-grid">
		        	<Col xs={12} md={4}><Input type="text" name="email" defaultValue={responsavel.email} label="Email" placeholder="Email para contato"  /></Col>
		        	<Col xs={12} md={4}><Input type="text" name="telefone" defaultValue={responsavel.telefone} label="Telefone" placeholder="Telefone Fixo"  /></Col>
		        	<Col xs={12} md={4}><Input type="text" name="celular" defaultValue={responsavel.celular} label="Celular" placeholder="Celular com ddd"  /></Col>
		        </Row>
		        <Row className="show-grid">	
		        	<Col xs={12} md={4}><Input type="text" name="sapato" defaultValue={responsavel.sapato} label="Sapato" placeholder="Tamanho da sapato"  /></Col>
		        	<Col xs={12} md={4}><Input type="text" name="bermuda" defaultValue={responsavel.bermuda} label="Bermuda" placeholder="Tamanho da bermuda"  /></Col>
		        	<Col xs={12} md={4}><Input type="text" name="camiseta" defaultValue={responsavel.camiseta} label="Camiseta" placeholder="Tamanho da camiseta"  /></Col>
		        </Row>
	      </Grid>
        </div>

    render = () =>
        <Crud title="Responsável"
              controller={ResponsaveisController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Responsaveis