import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid, Panel, Glyphicon, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, Button} from 'react-bootstrap';

class ExecucaoAtividades extends Component {
    state = {
        id: "",
        nome: "",
        data: "",
        comentario: "",
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
	            comentario: atividade.comentario,
	            atividadeGrupos: atividade.atividadeGrupos
        });
        $.toaster({ title: 'Sucesso', message : 'Registro salvo com sucesso', settings: {timeout: 3000} });
        })
    }

    procurarAlunos = () => {
        Request.get('api/execucaoAtividades/procurarAlunos', {
            id: this.props.id
        })
        .then(atividade => this.setState({
            id: atividade.id,
            nome: atividade.nome,
            data: atividade.data,
            comentario: atividade.comentario,
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
    
    alterarComentarioGrupo = (idComentario, event) => {
    	
    	var atividades = this.state.atividadeGrupos
    	
    	var atividadeEscolhido = atividades.find(element => {
    		return element.id == idComentario
    	})
    	
    	atividadeEscolhido.comentario = event.target.value
    	
    	this.setState({atividadeGrupos : atividades})
    }
    
    alterarComentario = (event) => {
    	
    	var comentarioNovo = this.state.comentario
    	comentarioNovo = event.target.value
    	
    	this.setState({comentario : comentarioNovo})
    }
    
    componentDidMount = () => {
    	this.procurarAlunos()
    }
    
    render = () =>
        <div style={s.app}>
        <Navbar fixedTop fluid inverse>
	        <Navbar.Brand>
	            <a href="?login">Remo meu Rumo</a>
	        </Navbar.Brand>
	        <Nav>
	        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; Execução de Atividades</NavItem>
	        </Nav>
	        <Nav pullRight eventKey={0}> {}
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
	            	        		<Col xs={3} md={3}><strong>Alunos</strong></Col>
	            	        		<Col xs={9} md={9}><strong>Comentários do grupo</strong></Col>
	            	          	</Row>
	            	          	<Row className="show-grid">
	            	          	<Col xs={3} md={3}>
	            	          	{atividadeGrupo.alunos.map((aluno, indexAluno) => {
	            	          		return <div><Button active bsSize="xsmall"><Glyphicon style={s.button} onClick={this.removerAluno.bind(this, aluno.id, atividadeGrupo.id)} glyph="minus"/></Button>&nbsp;&nbsp;{aluno.nome}</div>
	            	          	})}
	            	          	</Col>
	    	          				<Col xs={9} md={9}>
	    	          					<Input type="textarea" label=""  name="comentario" defaultValue={atividadeGrupo.comentario} onChange={this.alterarComentarioGrupo.bind(this, atividadeGrupo.id)} placeholder="Considerações e sugestões pedagógicas" style={{height: 120}} /></Col>
	    	          			</Row>	
            	          	</Panel>
            	        })}
            	        <Row className="show-grid">
    	        			<Col xs={12}><strong>Comentários gerais da Aula</strong></Col>
    	        		</Row>
            	        <Row className="show-grid">
            	        	<Col xs={12}>
            	        	<Input type="textarea" label="" name="comentario" defaultValue={this.state.comentario} onChange={this.alterarComentario.bind(this)} placeholder="Considerações e sugestões pedagógicas" style={{height: 120}} /></Col>
      					</Row>
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
