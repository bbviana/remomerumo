import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {AlunosController} from '../controllers'
import {Input, Row, Col, Grid, Button, Glyphicon} from 'react-bootstrap'

class Alunos extends Component {
    componentDidMount = () => AlunosController.list() // Busca inicial
 
    searchSchema = (search) =>
       <Input type="text" placeholder="Buscar por nome do Aluno" autoComplete="off"
               name="nome" defaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ativo?</th>
            </tr>,

        body: (aluno) =>
            <tr>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
				<td>{aluno.email}</td>
                <td>{aluno.telefone}</td>
                <td>{aluno.ativo?"Sim":"Não"}</td>
            </tr>,
            
            
        actions: (aluno) =>  
            	 <div>
            		<Button id={aluno.id} bsStyle="link" title="Ver o Resumo" onClick={() => window.open("resumoAlunos?id="+aluno.id
            				)} ><Glyphicon glyph="stats"/></Button>
            	 </div> 
    }

    formSchema = (aluno, {responsaveis = []}) =>
        <div>
            <Grid fluid>
	        <Row className="show-grid">
	          	<Col xs={12} md={6}><Input type="text" label="Nome" placeholder="Nome completo do aluno" name="nome" defaultValue={aluno.nome} autoFocus/></Col>
	          	<Col xs={12} md={6}><Input type="text" name="apelido" defaultValue={aluno.apelido} label="Apelido" placeholder="Apelido"  /></Col>
	        </Row>
	
	        <Row className="show-grid">
	        	<Col xs={12} md={4}><Input type="text" name="dtNasc" defaultValue={aluno.dtNasc} label="Data de Nascimento" placeholder="dd/mm/aaaa"  /></Col>	        
	          	<Col xs={12} md={4}><Input type="text" name="naturalDe" defaultValue={aluno.naturalDe} label="Natural de" placeholder="Cidade - estado"  /></Col>
	          	<Col xs={12} md={4}><Input type="text" name="dataDeIngresso" defaultValue={aluno.dataDeIngresso} label="Data de Ingresso" placeholder="dd/mm/aaaa"  /></Col>
	        </Row>
	
	        <Row className="show-grid">
	        	<Col xs={12} md={4}><Input type="text" name="cpf" defaultValue={aluno.cpf} label="CPF" placeholder="Documento CPF"  /></Col>
	        	<Col xs={12} md={4}><Input type="text" name="rg" defaultValue={aluno.rg} label="RG" placeholder="Documento RG"  /></Col>
	        	<Col xs={12} md={4}><Input type="text" name="matrAluno" defaultValue={aluno.matrAluno} label="Código de identificação" placeholder="Matricula externa ou paciente"  /></Col>
	        </Row>
	        <Row className="show-grid">	
	        	<Col xs={12}><Input type="text" name="endereco" defaultValue={aluno.endereco} label="Endereço" placeholder="Rua, número"  /></Col>
	       </Row>
	
	        <Row className="show-grid">
	        	<Col xs={12} md={4}><Input type="text" name="email" defaultValue={aluno.email} label="Email" placeholder="Email para contato"  /></Col>
	        	<Col xs={12} md={4}><Input type="text" name="telefone" defaultValue={aluno.telefone} label="Telefone" placeholder="Telefone Fixo"  /></Col>
	        	<Col xs={12} md={4}><Input type="text" name="celular" defaultValue={aluno.celular} label="Celular" placeholder="Celular com ddd"  /></Col>
	        </Row>
	        <Row className="show-grid">
	        	<Col xs={12} md={4}><Input type="text" name="email" defaultValue={aluno.email} label="Email" placeholder="Email para contato"  /></Col>
	        	<Col xs={12} md={4}><Input type="text" name="telefone" defaultValue={aluno.telefone} label="Telefone" placeholder="Telefone Fixo"  /></Col>
	        	<Col xs={12} md={4}><Input type="text" name="celular" defaultValue={aluno.celular} label="Celular" placeholder="Celular com ddd"  /></Col>
        	</Row>
	        <Row className="show-grid">	
	        	<Col xs={12} md={4}><Input type="text" name="periodoEscolar" defaultValue={aluno.periodoEscolar} label="Período Escolar" placeholder="Período Escolar"  /></Col>
	        	<Col xs={12} md={4}><Input type="text" name="transporte" defaultValue={aluno.transporte} label="Transporte" placeholder="Transporte"  /></Col>
	        	<Col xs={12} md={4}><Input type="text" name="horarioTreino" defaultValue={aluno.horarioTreino} label="Horário de Treino" placeholder="Horário de Treino"  /></Col>
	        </Row>
	        <Row className="show-grid">	
	        	<Col xs={12}>
	        	 <Input type="select" label="Responsáveis" name="responsaveis"
	                   defaultValue={ids(aluno.responsaveis)} onChange={handleAssociationChange} multiple>
	                <option value="">Selecione...</option>
	                {responsaveis.map((element, i) =>
	                    <option key={i} value={element.id}>{element.nome}</option>
	                )}
	            </Input>
		        </Col>
	        </Row>
	        <Row className="show-grid">	
        		<Col xs={12}>
        			<Input type="textarea" name="observacoes" defaultValue={aluno.observacoes} label="Observações" placeholder="Detalhes relevantes sobre o aluno"  />
        		</Col>
        	</Row>
        	<Row className="show-grid">	
    			<Col xs={12}>
    				<Input type="textarea" name="abc" defaultValue={aluno.abc} label="Abc" placeholder="Adaptações, limitações e indicações para a criança"  />
    			</Col>
    		</Row>
        	<Row className="show-grid">	
    			<Col xs={12}>
    				<Input type="checkbox" name="ativo" defaultChecked={aluno.ativo} label="Ativo" />
    			</Col>
    		</Row>
	        
      </Grid>
        </div>

    render = () =>
        <Crud title="Aluno"
              controller={AlunosController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema}>
        </Crud>
}


export default Alunos