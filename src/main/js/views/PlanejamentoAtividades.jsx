import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Row, Col, Grid, Panel, Glyphicon, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, Button, Tab, Tabs, ButtonToolbar} from 'react-bootstrap';

class PlanejamentoAtividades extends Component {
    state = {
        id: "",
        nome: "",
        data: "",
        planejamentoGrupos: []
    }

    salvar = (event) => {
        event.preventDefault()

        Request.post('api/planejamentoAtividades/salvar', this.state)
        .then(atividade => this.setState({
            id: atividade.id,
            nome: atividade.nome,
            data: atividade.data,
            planejamentoGrupos: atividade.planejamentoGrupos
        }))
    }

    procurarGrupos = () => {
        Request.get('api/planejamentoAtividades/procurarGrupos', {
            id: this.props.id
        })
        .then(atividade => this.setState({
            id: atividade.id,
            nome: atividade.nome,
            data: atividade.data,
            planejamentoGrupos: atividade.planejamentoGrupos
        }))
    }
    
    removerAluno = (idAluno, idPlanejamento) => {
    	var planejamentos = this.state.planejamentoGrupos
    	
    	var planejamentoEscolhido = planejamentos.find(element => {
    		return element.id == idPlanejamento
    	})
    	planejamentoEscolhido.alunos = planejamentoEscolhido.alunos.filter(element => {
    		return element.id != idAluno
    	})
    	this.setState({planejamentoGrupos : planejamentos})
    }
    
    removerColaborador = (idColaborador, idPlanejamento) => {
    	var planejamentos = this.state.planejamentoGrupos
    	
    	var planejamentoEscolhido = planejamentos.find(element => {
    		return element.id == idPlanejamento
    	})
    	planejamentoEscolhido.colaboradores = planejamentoEscolhido.colaboradores.filter(element => {
    		return element.id != idColaborador
    	})
    	this.setState({planejamentoGrupos : planejamentos})
    }
    
    removerPlanejamento = (idPlanejamento) => {
    	console.log(idPlanejamento)
    	var planejamentos = this.state.planejamentoGrupos
    	
    	var planejamentosEscolhido = planejamentos.filter(element => {
    		return element.id != idPlanejamento
    	})
    	
    	this.setState({planejamentoGrupos : planejamentosEscolhido})
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
                    	
                    	
                    	<Tabs defaultActiveKey={1}>
            		    
            	        {this.state.planejamentoGrupos.map((planejamentoGrupo, index) => {
            	        	return  <Tab eventKey={index} title={planejamentoGrupo.grupo.nome} > <div>
	            	        		<Grid fluid>	
	            	        	
			            	            <Row className="show-grid">
			            	        		<Col xs={6} md={2}><strong>Alunos</strong></Col>
			            	        		<Col xs={6} md={2}><strong>Colaboradores</strong></Col>
			            	        		<Col xs={12} md={4}><strong>Comentarios</strong></Col>
			            	        		<Col xs={12} md={4}><strong>Planejamento</strong></Col>
			            	          	</Row>
			            	          	<Row className="show-grid">
			            	          		<Col xs={6} md={2}>
				            	          		{planejamentoGrupo.alunos.map((aluno, indexAluno) => {
				            	          			return <div key={indexAluno} ><Button bsSize="xsmall" active>
				            	          			<Glyphicon style={s.button} onClick={this.removerAluno.bind(this, aluno.id, planejamentoGrupo.id)} glyph="minus"/></Button>&nbsp;&nbsp;{aluno.nome}</div>
				            	          		})}
			            	          		</Col>
			            	          		<Col xs={6} md={2}>
				            	          		{planejamentoGrupo.colaboradores.map((colaborador, indexColaborador) => {
				            	          			return <div key={indexColaborador} ><Button bsSize="xsmall" active>
				            	          			<Glyphicon style={s.button} onClick={this.removerColaborador.bind(this, colaborador.id, planejamentoGrupo.id)} glyph="minus"/></Button>&nbsp;&nbsp;{colaborador.nome}</div>
				            	          		})}
			            	          		</Col>
			            	          		<Col xs={12} md={4}><Input type="textarea" label="" name="comentario" defaultValue={planejamentoGrupo.comentario} placeholder="Comentário"  /></Col>
			            	          		<Col xs={12} md={4}><Input type="textarea" label="" name="planejamentoDeAula" defaultValue={planejamentoGrupo.planejamentoDeAula} placeholder="Planejamento de aula"  /></Col>
			            	          	</Row>
			            	          	<Row className="show-grid">
		            	        		<Col xs={12} md={12}>
		            	        			<ButtonToolbar>
		            	        				<Button bsStyle="primary" bsSize="medium" type="submit">Salvar</Button>
		            	        				<Button bsSize="medium" onClick={this.removerPlanejamento.bind(this, planejamentoGrupo.id)}>Remover</Button>
		            	        			</ButtonToolbar>
			            	            </Col>
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
