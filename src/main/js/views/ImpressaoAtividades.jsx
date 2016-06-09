import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Panel, Glyphicon, Nav, Navbar, NavBrand, NavItem, Table} from 'react-bootstrap';

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
	        <Navbar.Brand>
	            <a href="?login">Remo meu Rumo</a>
	        </Navbar.Brand>
	        <Nav>
	        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; Planejamento de Atividades</NavItem>
	        </Nav>
	        <Nav pullRight eventKey={0}> {/* This is the eventKey referenced */}
	            <NavItem eventKey={1} href="#">
	                <Glyphicon glyph="flag"/>&nbsp;&nbsp;Atividade : {this.state.nome},&nbsp;{this.state.data} 
	            </NavItem>
	            
	            <NavItem eventKey={2} onClick={() => window.close()}>
            		<Glyphicon glyph="remove"/>
            	</NavItem>
	        </Nav>
	    </Navbar>
        
            <div className="container-fluid">
            	<Table striped bordered condensed hover>
		            <thead>
		                <tr>
		                    <th><strong><Glyphicon glyph="fire"/>&nbsp;&nbsp;Alunos</strong></th>
		                    <th><strong><Glyphicon glyph="education"/>&nbsp;&nbsp;Colaboradores</strong></th>
		                    <th><strong><Glyphicon glyph="pushpin"/>&nbsp;&nbsp;Atividades</strong></th>
		                    <th><strong>Objetivos</strong></th>
		                </tr>
		            </thead>        
		            
            	        {this.state.atividadeGrupos.map((atividadeGrupo, index) => {
            	        	return  <tbody key={index}> <tr>
   	                     				<td colSpan="4">{atividadeGrupo.grupo.nome}</td>
   	                     		     </tr>
		            	                 <tr>
		            	                     <td>
				            	          		{atividadeGrupo.alunosTransient.map((aluno, indexAluno) => {
					            	          			return <div key={indexAluno} >
					            	          			<div>{aluno.nome}</div>
					            	          			<div><Glyphicon glyph="minus"/>&nbsp;&nbsp;{aluno.abc}</div></div>
					            	          		})}
			            	          		</td>
			            	          		<td>
	            	          					{atividadeGrupo.colaboradores.map((colaborador, indexColaborador) => {
				            	          			return <div key={indexColaborador} >
				            	          			{colaborador.nome}</div>
				            	          		})}
			            	          		</td>
			            	          		<td>			            	          	
				            	          		{atividadeGrupo.tarefas.map((tarefa, indexTarefa) => {
				            	          			return <div key={indexTarefa}>
				            	          			{tarefa.nome}</div>
				            	          		})}
							            	</td>
							            	<td><Input type="textarea" label="" name="planejamentoDeAula" defaultValue={atividadeGrupo.planejamentoDeAula} disabled/></td>
							            </tr>	
							      </tbody>    	   
            	        })}
            	        
            	   </Table>
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
