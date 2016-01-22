import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Table, Glyphicon, MenuItem, Nav, Navbar, NavBrand, NavItem, Tabs, Tab, ListGroup, ListGroupItem, Panel} from 'react-bootstrap';

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
		            <Table striped hover>
	                    <thead>
	                    <tr>
	                    	<th>Nome</th>
	                    	<th>Data</th>
	                    	<th>Comentário</th>
	                    </tr>
	                    </thead>
	                    <tbody>
	                    {this.state.alunoAtividades.map((alunoAtividade, index) => 
            	        	<tr key={index}>
                        		<td> {alunoAtividade.atividade.nome}</td>
                        		<td> {alunoAtividade.atividade.data}</td>
                        		<td> {alunoAtividade.atividade.comentario}</td>
                        	</tr>	
            	        )}
	            	        </tbody>
		                   </Table>
	                    </div>
                    </Tab>
                    <Tab eventKey={2} title="Avaliações"><p>&nbsp;</p>
	                	<div>
	                	<Table striped hover>
		                    <thead>
		                    <tr>
		                    	<th>Nome</th>
		                    	<th>Data</th>
		                    	<th>Comentário</th>
		                    	<th>Valores</th>
		                    </tr>
		                    </thead>
		                    <tbody>
			        	        {this.state.avaliacoes.map((avaliacao, index) => 
			        	        	<tr key={index}>
	                            		<td> {avaliacao.modelo.nome}</td>
	                            		<td> {avaliacao.data}</td>
	                            		<td> {avaliacao.comentario}</td>
	                            		<td>  
	                            		
	                            		 <Panel collapsible bsStyle="info" header="Clique para ver os valores">
	                            		    <ListGroup fill>
	                            		    {avaliacao.informacoesClinicas.map((info, index2) =><div>
	                            		      <ListGroupItem key={index2}><strong>{info.tipo.nome}</strong>:&nbsp;{info.valor}&nbsp;<strong>{info.tipo.sigla}</strong></ListGroupItem></div>
	                            		    )}
	                            		    </ListGroup>
	                            		  </Panel>
	                            		 
	                            		 </td>
	                            	</tr>	
			        	        )}
			        	        </tbody>
				           </Table>
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
