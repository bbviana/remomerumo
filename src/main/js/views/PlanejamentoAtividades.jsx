import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Row, Col, Grid, Panel, Glyphicon, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, Button} from 'react-bootstrap';

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
            	        <Grid fluid>
            		    
            	        {this.state.planejamentoGrupos.map((planejamentoGrupo, index) => {
            	        	return <Panel  key={index} header={planejamentoGrupo.grupo.nome}>
	            	            <Row className="show-grid">
	            	        		<Col xs={6} md={2}>Alunos</Col>
	            	        		<Col xs={6} md={2}>Colaboradores</Col>
	            	        		<Col xs={12} md={4}>Comentarios</Col>
	            	        		<Col xs={12} md={4}>Planejamento</Col>
	            	          	</Row>
	            	          	<Row className="show-grid">
	            	          		<Col xs={6} md={2}>
		            	          		{planejamentoGrupo.alunos.map((aluno, indexAluno) => {
		            	          			return <div key={indexAluno} >{aluno.nome}&nbsp; <Button bsStyle="danger" bsSize="xsmall">
		            	          			<Glyphicon style={s.button} onClick={this.removerAluno.bind(this, aluno.id, planejamentoGrupo.id)} glyph="minus"/></Button></div>
		            	          		})}
	            	          		</Col>
	            	          		<Col xs={6} md={2}>
		            	          		{planejamentoGrupo.colaboradores.map((colaborador, indexColaborador) => {
		            	          			return <div key={indexColaborador} >{colaborador.nome}&nbsp; <Button bsStyle="danger" bsSize="xsmall">
		            	          			<Glyphicon style={s.button} onClick={this.removerColaborador.bind(this, colaborador.id, planejamentoGrupo.id)} glyph="minus"/></Button></div>
		            	          		})}
	            	          		</Col>
	            	          		<Col xs={12} md={4}><Input type="textarea" label="" name="comentario" defaultValue={planejamentoGrupo.comentario} placeholder="Comentário"  /></Col>
	            	          		<Col xs={12} md={4}><Input type="textarea" label="" name="planejamentoDeAula" defaultValue={planejamentoGrupo.planejamentoDeAula} placeholder="Planejamento de aula"  /></Col>
	            	          	</Row>
	            	          	<Row className="show-grid">
            	          			<Col xs={12}><Button bsStyle="danger" bsSize="xsmall">Remover Grupo&nbsp;<Glyphicon style={s.button} onClick={this.removerPlanejamento.bind(this, planejamentoGrupo.id)} glyph="minus"/></Button></Col>
            	          		</Row>
            	          	</Panel>
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

export default PlanejamentoAtividades
