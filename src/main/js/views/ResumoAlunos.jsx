import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Row, Col, Grid, Panel, Glyphicon, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, Button, Tabs, Tab} from 'react-bootstrap';

class ResumoAlunos extends Component {
    state = {
        id: "",
        nome: "",
        alunoAtividades: [],
    	avaliacoes: []
    }

    procurarAluno = () => {
        Request.get('api/resumoAlunos/procurarAluno', {
            id: this.props.id
        })
        .then(aluno => this.setState({
            id: aluno.id,
            nome: aluno.nome,
            alunoAtividades: aluno.alunoAtividadesTransient,
            avaliacoes: aluno.avaliacoesTransient
        }))
    }
    
    componentDidMount = () => {
    	this.procurarAluno()
    	
    }
    
    render = () =>
        <div style={s.app}>
        <Navbar fixedTop fluid inverse>
	        <NavBrand>
	            <a href="?login">Remo meu Rumo</a>
	        </NavBrand>
	        <Nav>
	        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; Resumo dos Alunos</NavItem>
	        </Nav>
	        <Nav right eventKey={0}> {}
	            <NavItem eventKey={1} href="#">
	                <Glyphicon glyph="flag"/>&nbsp;&nbsp;Aluno : {this.state.nome} 
	            </NavItem>
	            
	            <NavItem eventKey={2} onClick={() => window.close()}>
            	<Glyphicon glyph="remove"/>
            </NavItem>
	        </Nav>
	    </Navbar>
        
            <div className="container-fluid">
                <form style={s.form} onSubmit={this.salvar}>
                <Tabs defaultActiveKey={1}>
		            <Tab eventKey={1} title="Atividades"><p>&nbsp;</p>
	                    	<div>
	            	        <Grid fluid>
	            	        {this.state.alunoAtividades.map((alunoAtividade, index) => {
	            	        	return <Panel  key={index} header={alunoAtividade.id}>
		            	            <Row className="show-grid">
		            	        		<Col xs={4} md={3}><strong>Alunos</strong></Col>
		            	        		<Col xs={6} md={9}><strong>Comentarios</strong></Col>
		            	        		
		            	          	</Row>
	            	          	</Panel>
	            	        })}
	            	      </Grid>
	                    </div>
                    </Tab>
                    <Tab eventKey={2} title="Avaliações"><p>&nbsp;</p>
	                	<div>
		        	        <Grid fluid>
		        		    
			        	        {this.state.avaliacoes.map((avaliacao, index) => {
			        	        	return <Panel  key={index} header={avaliacao.nome}>
			            	            <Row className="show-grid">
			            	        		<Col xs={4} md={3}><strong>Alunos</strong></Col>
			            	        		<Col xs={6} md={9}><strong>Comentarios</strong></Col>
			            	        		
			            	          	</Row>
			        	          	</Panel>
			        	        })}
			        	    </Grid>
		        	    </div>
		        	</Tab>
                  </Tabs>  
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

export default ResumoAlunos
