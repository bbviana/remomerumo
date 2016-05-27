import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {id, ids} from '../crud/Associations'
import {Image, Input, Row, Col, Grid, Panel, Glyphicon, MenuItem, Nav, Navbar, NavBrand, NavItem, Button, Tab, Tabs, ButtonToolbar, ListGroupItem, ListGroup} from 'react-bootstrap';

class ResumoAtividades extends Component {
    state = {
        id: "",
        nome: "",
        data: "",
        tipoAtividade: "",
        atividades: []
    }
   
    procurarAtividades = () => {
        Request.get('api/resumoAtividades/procurarAtividades')
        .then(atividade => this.setState({
            id: atividade.id,
            nome: atividade.nome,
            data: atividade.data,
            tipoAtividade: atividade.tipoAtividade,
            atividades: atividade.atividadesAnterioresTransient
        }))
    }
    
     criarAtividade = (event) => {
        event.preventDefault()

        Request.post('api/resumoAtividades/criarAtividade', this.state)
        .then(atividade =>{ 
	        this.setState({
	            id: atividade.id,
	            nome: atividade.nome,
	            data: atividade.data,
	            tipoAtividade: atividade.tipoAtividade
	        });
        	$.toaster({ title: 'Sucesso', message : 'Registro salvo', settings: {timeout: 3000} });
        }
    )}
    
    componentDidMount = () => {
    	this.procurarAtividades()
    }
    
    render = () =>
        <div style={s.app}>
        <Navbar fixedTop fluid inverse>
	        <NavBrand>
	            <a href="?login">Remo meu Rumo</a>
	        </NavBrand>
	        <Nav>
	        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; Planejamento de Atividades</NavItem>
	        </Nav>
	        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
	            <NavItem eventKey={1} href="#">
	                <Glyphicon glyph="flag"/>&nbsp;&nbsp;Atividade : {this.state.nome},&nbsp;{this.state.data} 
	            </NavItem>
	            
	            <NavItem eventKey={2} onClick={() => window.close()}>
            		<Glyphicon glyph="remove"/>
            	</NavItem>
	        </Nav>
	    </Navbar>
        
            <div className="container-fluid">
                <form style={s.form} onSubmit={this.criarAtividade}>
                    	<div>
							<Grid fluid>	
		            	        		<Row className="show-grid">
			            	        		<Col xs={12}>&nbsp;Ultima Criada</Col>
			            	          	</Row>
			            	          	<Row className="show-grid">
			            	        		<Col xs={12}>&nbsp;Ultima Criada</Col>
			            	          	</Row>
			            	          	<Row className="show-grid">
			            	        		<Col xs={12}>&nbsp;Anterires</Col>
			            	          	</Row>
			            	            <Row className="show-grid">
			            	        		<Col xs={6} md={2}><strong>Alunos</strong></Col>
			            	        		<Col xs={6} md={2}><strong>Colaboradores</strong></Col>
			            	        		<Col xs={12} md={4}><strong>Planejamento</strong></Col>
			            	        		<Col xs={12} md={4}><strong>Tarefas</strong></Col>
			            	          	</Row>
			            	     </Grid>  
                    </div>
                    
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

export default ResumoAtividades
