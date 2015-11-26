import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Row, Col, Grid, Panel, Glyphicon, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, Button} from 'react-bootstrap';

class ExecucaoAtividades extends Component {
    state = {
        id: "",
        nome: "",
        data: "",
        planejamentoGrupos: []
    }

    salvar = (event) => {
        event.preventDefault()

        Request.post('api/execucaoAtividades/salvar', this.state)
        .then(atividade => this.setState({
            id: atividade.id,
            nome: atividade.nome,
            data: atividade.data,
            planejamentoGrupos: atividade.planejamentoGrupos
        }))
    }

    procurarGrupos = () => {
        Request.get('api/execucaoAtividades/procurarAlunos', {
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
	        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; Execução de Atividades</NavItem>
	        </Nav>
	        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
	            <NavItem eventKey={1} href="#">
	                <Glyphicon glyph="flag"/>&nbsp;&nbsp;Atividade : {this.state.nome},&nbsp;{this.state.data} 
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
            		    
            	        {this.state.planejamentoGrupos.map((planejamentoGrupo, index) => {
            	        	return <Panel  key={index} header={planejamentoGrupo.grupo.nome}>
	            	            <Row className="show-grid">
	            	        		<Col xs={6} md={4}>Alunos</Col>
	            	        		<Col xs={12} md={8}>Comentarios</Col>
	            	          	</Row>
	            	          	<Row className="show-grid">
	            	          		<Col xs={6} md={4}>
		            	          		{planejamentoGrupo.alunos.map((aluno, indexAluno) => {
		            	          			return <div key={indexAluno} >{aluno.nome}&nbsp; <Button bsStyle="danger" bsSize="xsmall">
		            	          			<Glyphicon style={s.button} onClick={this.removerAluno.bind(this, aluno.id, planejamentoGrupo.id)} glyph="minus"/></Button></div>
		            	          		})}
	            	          		</Col>
	            	          		<Col xs={6} md={8}><Input type="textarea" label="" name="comentario" defaultValue={planejamentoGrupo.comentario} placeholder="Comentário"  /></Col>
	            	          	</Row>
	            	          	<Row className="show-grid">
            	          			<Col xs={12}><Button bsStyle="danger" bsSize="xsmall"><Glyphicon style={s.button} onClick={this.removerPlanejamento.bind(this, planejamentoGrupo.id)} glyph="minus"/></Button></Col>
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

export default ExecucaoAtividades
