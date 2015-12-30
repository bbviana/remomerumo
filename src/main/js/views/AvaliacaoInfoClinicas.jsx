import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Row, Col, Table, Glyphicon, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, Button} from 'react-bootstrap';

class AvaliacaoInfoClinicas extends Component {
    state = {
        id: "",
        aluno: "",
        modelo: "",
        informacoesClinicas: []
    }

    salvar = (event) => {
        event.preventDefault()
        Request.post('api/avaliacaoInfoClinicas/salvar', this.state)
        .then(avaliacao => this.setState({
            id: avaliacao.id,
            aluno: avaliacao.aluno.nome,
            modelo: avaliacao.modelo.nome,
            informacoesClinicas: avaliacao.informacoesClinicas
        }))
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
    
    componentDidMount = () => {
    	this.procurarAvaliacao()
    }
    
    render = () =>
        <div style={s.app}>
        <Navbar fixedTop fluid inverse>
	        <NavBrand>
	            <a href="?login">Remo meu Rumo</a>
	        </NavBrand>
	        <Nav>
	        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; Informação Clínica da Avaliação</NavItem>
	        </Nav>
	        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
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
                        {this.state.informacoesClinicas.map((informacaoClinica, index) => {
                            return <tr key={index}>
	                            <td>{informacaoClinica.tipo.nome}</td>
	                            <td><Input type="text" label="" name="valor" defaultValue={informacaoClinica.valor} placeholder="Valor"  /></td>
	                            <td>{informacaoClinica.tipo.sigla}</td>
                            </tr>
                        })}
                        </tbody>
                    </Table>
                  
                    </div>
                    
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Salvar</button>
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
