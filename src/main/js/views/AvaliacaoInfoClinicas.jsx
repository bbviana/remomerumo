import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Row, Col, Table, Glyphicon, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, Button, ButtonToolbar} from 'react-bootstrap';

class AvaliacaoInfoClinicas extends Component {
    state = {
        id: "",
        aluno: "",
        modelo: "",
        informacoesClinicas: [],
        fechada: false
    }

    salvar = (event) => {
    	console.log("chamou também!")
        event.preventDefault()
        Request.post('api/avaliacaoInfoClinicas/salvar', {
        	id: this.state.id,
        	fechada: this.state.fechada,
        	informacoesClinicas: this.state.informacoesClinicas
        })
        .then(avaliacao => {
	        this.setState({
	            id: avaliacao.id,
	            aluno: avaliacao.aluno.nome,
	            modelo: avaliacao.modelo.nome,
	            informacoesClinicas: avaliacao.informacoesClinicas
	        });                   
	        $.toaster({ title: 'Sucesso', message : 'Registro salvo', settings: {timeout: 3000} });
        })
    }
    
    salvarEFechar = () => {
        console.log("chamou")
        this.state.fechada = true
    }

    procurarAvaliacao = () => {
        Request.get('api/avaliacaoInfoClinicas/procurarAvaliacao', {
            id: this.props.id
        })
        .then(avaliacao => this.setState({
            id: avaliacao.id,
            aluno: avaliacao.aluno.nome,
            modelo: avaliacao.modelo.nome,
            informacoesClinicas: avaliacao.informacoesClinicas
        }))
    }
    
    alterarValor = (idInformacaoClinica, event) => {
    	
    	var infoClinicas = this.state.informacoesClinicas
    	
    	var infoEscolhida = infoClinicas.find(element => {
    		return element.id == idInformacaoClinica
    	})
    	
    	infoEscolhida.valor = event.target.value
    	console.log(infoEscolhida.valor)
    	this.setState({informacoesClinicas : infoClinicas})
    }
    
    componentDidMount = this.procurarAvaliacao
    
    render = () =>
        <div style={s.app}>
	        <Navbar fixedTop fluid inverse>
		        <Navbar.Brand>
		            <a href="?login">Remo meu Rumo</a>
		        </Navbar.Brand>
		        <Nav>
		        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; Informação Clínica da Avaliação</NavItem>
		        </Nav>
		        <Nav pullRight eventKey={0}> {/* This is the eventKey referenced */}
		            <NavItem eventKey={1} href="#">
		                <Glyphicon glyph="flag"/>&nbsp;&nbsp;Avaliacao : {this.state.modelo}, Aluno: {this.state.aluno} 
		            </NavItem>
		            
		            <NavItem eventKey={2} onClick={() => window.close()}>
		            	<Glyphicon glyph="remove"/>
		            </NavItem>
		        </Nav>
		    </Navbar>
        
	        <div className="container-fluid">
	            <form style={s.form} onSubmit={this.salvar}>
                	<div>
	                	<Table striped hover>
		                    <thead>
		                    <tr>
		                    	<th>Medida</th>
		                    	<th>Valor</th>
		                    	<th>Sigla</th>
		                    </tr>
		                    </thead>
		                    <tbody>
		                    {this.state.informacoesClinicas.map((informacaoClinica, index) =>
		                        <tr key={index}>
		                            <td>{informacaoClinica.tipo.nome}</td>
		                            <td><Input type="text" label="" name="valor" onChange={this.alterarValor.bind(this, informacaoClinica.id)} defaultValue={informacaoClinica.valor} placeholder="Valor"  /></td>
		                            <td>{informacaoClinica.tipo.sigla}</td>
		                        </tr>
		                    )}
		                    </tbody>
	                    </Table>
	                </div>
    			<ButtonToolbar>
	                <Button bsSize="medium" bsStyle="primary" type="submit">Salvar</Button>
	                <Button bsSize="medium" bsStyle="warning" onClick={() => this.salvarEFechar()} type="submit">Salvar e Finalizar</Button>
	            </ButtonToolbar>    
	            </form>
	        </div>
	        </div>
}

const s = {
    form: {
        padding: 15,
        margin: "0 auto"
    },
    
    button: {
    	cursor: "pointer"
    },
    app: {
        paddingTop: 50
    }
}

export default AvaliacaoInfoClinicas
