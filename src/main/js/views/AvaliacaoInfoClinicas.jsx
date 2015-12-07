import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Row, Col, Grid, Panel, Glyphicon, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, Button} from 'react-bootstrap';

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
    	console.log(this.props.id)
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
	                <Glyphicon glyph="flag"/>&nbsp;&nbsp;avaliacao : {this.state.aluno},&nbsp;{this.state.modelo} 
	            </NavItem>
	            
	            <NavItem eventKey={2} href="?login">
	                <Glyphicon glyph="log-out"/>
	            </NavItem>
	        </Nav>
	    </Navbar>
        
            <div className="container-fluid">
                <form style={s.form} onSubmit={this.salvar}>
                    
                    	<div>
            	        <Grid fluid>
            	        <Row className="show-grid">
	    	        		<Col xs={3} md={2}>Medida</Col>
	    	        		<Col xs={6} md={8}>Valor</Col>
	    	        		<Col xs={3} md={2}>Sigla</Col>
    	        		</Row>
            	        {this.state.informacoesClinicas.map((informacaoClinica, index) => {
            	          		return  <Row className="show-grid" key={indexAluno}>
	            	          		<Col xs={2} md={2}>{informacaoClinica.tipo.nome}</Col>
	            	          		<Col xs={8} md={8}><Input type="text" label="" name="valor" defaultValue={informacaoClinica.valor} placeholder="Valor"  /></Col>
	            	          		<Col xs={2} md={2}>{informacaoClinica.tipo.sigla}</Col>
	            	          	</Row>
            	        })}
            	      </Grid>
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
