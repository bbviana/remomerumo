import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Row, Col, Grid, Panel, Glyphicon, MenuItem, Nav, Navbar, NavBrand, NavItem, Button, Tab, Tabs, ButtonToolbar, ListGroupItem, ListGroup} from 'react-bootstrap';

class PlanejamentoAtividades extends Component {
    state = {
        id: "",
        nome: "",
        data: "",
        atividadeGrupos: []
    }

    salvar = (event) => {
        event.preventDefault()

        Request.post('api/planejamentoAtividades/salvar', this.state)
        .then(atividade =>{ 
	        this.setState({
	            id: atividade.id,
	            nome: atividade.nome,
	            data: atividade.data,
	            atividadeGrupos: atividade.atividadeGrupos
	        });
        	$.toaster({ title: 'Sucesso', message : 'Registro salvo', settings: {timeout: 3000} });
        }
    )}

    procurarGrupos = () => {
        Request.get('api/planejamentoAtividades/procurarGrupos', {
            id: this.props.id
        })
        .then(atividade => this.setState({
            id: atividade.id,
            nome: atividade.nome,
            data: atividade.data,
            atividadeGrupos: atividade.atividadeGruposTransient
        }))
    }
    
    removerAluno = (idAluno, idPlanejamento) => {
    	var atividades = this.state.atividadeGrupos
    	
    	var atividadeEscolhido = atividades.find(element => {
    		return element.id == idPlanejamento
    	})
    	atividadeEscolhido.alunos = atividadeEscolhido.alunos.filter(element => {
    		return element.id != idAluno
    	})
    	this.setState({atividadeGrupos : atividades})
    }
    
    removerColaborador = (idColaborador, idPlanejamento) => {
    	var atividades = this.state.atividadeGrupos
    	
    	var atividadeEscolhido = atividades.find(element => {
    		return element.id == idPlanejamento
    	})
    	atividadeEscolhido.colaboradores = atividadeEscolhido.colaboradores.filter(element => {
    		return element.id != idColaborador
    	})
    	this.setState({atividadeGrupos : atividades})
    }
    
    removerPlanejamento = (idPlanejamento) => {
    	var atividades = this.state.atividadeGrupos
    	
    	var atividadesEscolhido = atividades.filter(element => {
    		return element.id != idPlanejamento
    	})
    	
    	this.setState({atividadeGrupos : atividadesEscolhido})
    }
    
    alterarComentario = (idPlanejamento, event) => {
    	
    	var atividades = this.state.atividadeGrupos
    	
    	var atividadeEscolhido = atividades.find(element => {
    		return element.id == idPlanejamento
    	})
    	
    	atividadeEscolhido.comentario = event.target.value
    	
    	this.setState({atividadeGrupos : atividades})
    }
    
    alterarPlanejamento = (idPlanejamento, event) => {
    	
    	var atividades = this.state.atividadeGrupos
    	
    	var atividadeEscolhido = atividades.find(element => {
    		return element.id == idPlanejamento
    	})
    	
    	atividadeEscolhido.planejamentoDeAula = event.target.value
    	
    	this.setState({atividadeGrupos : atividades})
    }
    
    componentDidMount = () => {
    	this.procurarGrupos()
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
                <form style={s.form} onSubmit={this.salvar}>
                    
                    	<div>
                    	                    	
                    	<Tabs>
            		    
            	        {this.state.atividadeGrupos.map((atividadeGrupo, index) => {
            	        	return  <Tab eventKey={index} title={atividadeGrupo.grupo.nome} > <div>
	            	        		<Grid fluid>	
		            	        		<Row className="show-grid">
			            	        		<Col xs={12}>&nbsp;</Col>
			            	          	</Row>
			            	            <Row className="show-grid">
			            	        		<Col xs={6} md={2}><strong>Alunos</strong></Col>
			            	        		<Col xs={6} md={2}><strong>Colaboradores</strong></Col>
			            	        		<Col xs={12} md={4}><strong>Planejamento</strong></Col>
			            	        		<Col xs={12} md={4}><strong>Comentários</strong></Col>
			            	          	</Row>
			            	          	<Row className="show-grid">
			            	          		<Col xs={6} md={2}>
			            	          		 <ListGroup>
				            	          		{atividadeGrupo.alunosTransient.map((aluno, indexAluno) => {
				            	          			return <div key={indexAluno} ><ListGroupItem><Button bsSize="xsmall" active>
				            	          			<Glyphicon style={s.button} onClick={this.removerAluno.bind(this, aluno.id, atividadeGrupo.id)} glyph="minus"/></Button>&nbsp;&nbsp;{aluno.nome}
				            	          			</ListGroupItem>
				            	          			<ListGroupItem bsStyle="danger">{aluno.abc}</ListGroupItem></div>
				            	          		})}
				            	          		</ListGroup>
			            	          		</Col>
			            	          		<Col xs={6} md={2}>
			            	          			<ListGroup>
				            	          		{atividadeGrupo.colaboradores.map((colaborador, indexColaborador) => {
				            	          			return <div key={indexColaborador} ><ListGroupItem><Button bsSize="xsmall" active>
				            	          			<Glyphicon style={s.button} onClick={this.removerColaborador.bind(this, colaborador.id, atividadeGrupo.id)} glyph="minus"/></Button>&nbsp;&nbsp;{colaborador.nome}</ListGroupItem></div>
				            	          		})}
				            	          		</ListGroup>	
			            	          		</Col>
			            	          		<Col xs={12} md={4}><Input type="textarea" label="" onChange={this.alterarPlanejamento.bind(this, atividadeGrupo.id)} name="planejamentoDeAula" defaultValue={atividadeGrupo.planejamentoDeAula} placeholder="Planejamento de aula"  /></Col>
			            	          		<Col xs={12} md={4}><Input type="textarea" label="" onChange={this.alterarComentario.bind(this, atividadeGrupo.id)} name="comentario" defaultValue={atividadeGrupo.comentario} placeholder="Comentário"  /></Col>
			            	          	</Row>
		            	        		<Row className="show-grid">
		            	        			<Col xs={12}>&nbsp;</Col>
		            	        		</Row>
			            	          	<Row className="show-grid">
		            	        		<Col xs={12} md={12}>
		            	        			<ButtonToolbar>
		            	        				<Button bsSize="medium" bsStyle="danger" onClick={this.removerPlanejamento.bind(this, atividadeGrupo.id)}>Remover Grupo</Button>
		            	        				<Button bsSize="medium" bsStyle="primary" type="submit">Salvar Alterações</Button>
		            	        			</ButtonToolbar>
			            	            </Col>
		            	          	</Row>
	            	        		<Row className="show-grid">
	            	        			<Col xs={12}>&nbsp;</Col>
	            	        		</Row>
	            	        		
		            	          	</Grid>
            	          	</div>
            	          	</Tab>
            	        })}
            	      
            	      </Tabs>
            	      
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

export default PlanejamentoAtividades
