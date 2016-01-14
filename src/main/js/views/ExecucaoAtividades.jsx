import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Row, Col, Grid, Panel, Glyphicon, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, Button} from 'react-bootstrap';

class ExecucaoAtividades extends Component {
    state = {
        id: "",
        nome: "",
        data: "",
        atividadeGrupos: []
    }

    salvar = (event) => {
        event.preventDefault()

        Request.post('api/execucaoAtividades/salvar', this.state)
        .then(atividade => { 
        	this.setState({
	            id: atividade.id,
	            nome: atividade.nome,
	            data: atividade.data,
	            atividadeGrupos: atividade.atividadeGrupos
        });
        $.toaster({ title: 'Sucesso', message : 'Registro salvo com sucesso', settings: {timeout: 5000} });
        })
    }

    procurarGrupos = () => {
        Request.get('api/execucaoAtividades/procurarAlunos', {
            id: this.props.id
        })
        .then(atividade => this.setState({
            id: atividade.id,
            nome: atividade.nome,
            data: atividade.data,
            atividadeGrupos: atividade.atividadeGrupos
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
	        <Nav right eventKey={0}> {}
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
            		    
            	        {this.state.atividadeGrupos.map((atividadeGrupo, index) => {
            	        	return <Panel  key={index} header={atividadeGrupo.grupo.nome}>
	            	            <Row className="show-grid">
	            	        		<Col xs={4} md={3}><strong>Alunos</strong></Col>
	            	        		<Col xs={6} md={9}><strong>Comentarios</strong></Col>
	            	        		
	            	          	</Row>
	            	          	{atividadeGrupo.alunos.map((aluno, indexAluno) => {
	            	          		return  <Row className="show-grid" key={indexAluno}>
	            	          		<Col xs={4} md={3}><Button active bsSize="xsmall"><Glyphicon style={s.button} onClick={this.removerAluno.bind(this, aluno.id, atividadeGrupo.id)} glyph="minus"/></Button>&nbsp;&nbsp;{aluno.nome}</Col>
	            	          		<Col xs={6} md={9}><Input type="text" label="" name="comentario" defaultValue={atividadeGrupo.comentario} placeholder="Comentário"  /></Col>
	            	          	</Row>
	            	          	})}
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
