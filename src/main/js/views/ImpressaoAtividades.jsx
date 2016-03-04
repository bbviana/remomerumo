import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Row, Col, Grid, Panel, Glyphicon, MenuItem, Nav, Navbar, NavBrand, NavItem, Button, Tab, Tabs, ButtonToolbar, ListGroupItem, ListGroup} from 'react-bootstrap';

class ImpressaoAtividades extends Component {
    state = {
        id: "",
        nome: "",
        data: "",
        atividadeGrupos: []
    }

    procurarGrupos = () => {
        Request.get('api/impressaoAtividades/procurarGrupos', {
            id: this.props.id
        })
        .then(atividade => { 
        	this.setState({
	            id: atividade.id,
	            nome: atividade.nome,
	            data: atividade.data,
	            atividadeGrupos: atividade.atividadeGruposTransient
        	});
        	window.print();
        })
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
                    
                    	<div>
                    	                    	
            		    
            	        {this.state.atividadeGrupos.map((atividadeGrupo, index) => {
            	        	return  <Panel header={atividadeGrupo.grupo.nome} > <div>
	            	        		<Grid fluid>	
		            	        		<Row className="show-grid">
			            	        		<Col xs={12}>&nbsp;</Col>
			            	          	</Row>
			            	          	<Row className="show-grid">
			            	          		<Col xs={6} md={2}>
			            	          		<strong>Alunos</strong>
			            	          		 <ListGroup>
				            	          		{atividadeGrupo.alunosTransient.map((aluno, indexAluno) => {
				            	          			return <div key={indexAluno} ><ListGroupItem>
				            	          			<Glyphicon glyph="fire"/>&nbsp;&nbsp;{aluno.nome}
				            	          			</ListGroupItem>
				            	          			<ListGroupItem bsStyle="danger">{aluno.abc}</ListGroupItem></div>
				            	          		})}
				            	          		</ListGroup>
			            	          		</Col>
			            	          		<Col xs={6} md={2}>
			            	          		<strong>Colaboradores</strong>
			            	          			<ListGroup>
				            	          		{atividadeGrupo.colaboradores.map((colaborador, indexColaborador) => {
				            	          			return <div key={indexColaborador} ><ListGroupItem>
				            	          			<Glyphicon glyph="education"/>&nbsp;&nbsp;{colaborador.nome}</ListGroupItem></div>
				            	          		})}
				            	          		</ListGroup>	
			            	          		</Col>
			            	          		<Col xs={12} md={4}><strong>Planejamento</strong><Input type="textarea" label="" name="planejamentoDeAula" defaultValue={atividadeGrupo.planejamentoDeAula} disabled/></Col>
			            	          		<Col xs={12} md={4}><strong>Tarefas</strong>
			            	          			<ListGroup>
					            	          		{atividadeGrupo.tarefas.map((tarefa, indexTarefa) => {
					            	          			return <div ><ListGroupItem key={indexTarefa}>
					            	          			<Glyphicon glyph="pushpin"/>&nbsp;&nbsp;{tarefa.nome}</ListGroupItem></div>
					            	          		})}
				            	          	</ListGroup>
			            	          		</Col>
			            	          	</Row>
		            	        		<Row className="show-grid">
		            	        			<Col xs={12}>&nbsp;</Col>
		            	        		</Row>
	            	        		<Row className="show-grid">
	            	        			<Col xs={12}>&nbsp;</Col>
	            	        		</Row>
	            	        		
		            	          	</Grid>
            	          	</div>
            	          	</Panel>
            	        })}
            	      
            	      
                    </div>
                    
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

export default ImpressaoAtividades
