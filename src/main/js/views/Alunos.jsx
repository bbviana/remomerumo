import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {AlunosController} from '../controllers'
import {Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid, Button, Glyphicon} from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker';

class Alunos extends Component {
    componentDidMount = () => AlunosController.list() // Busca inicial
 
    searchSchema = (search) =>
       <FormControl type="text" placeholder="Buscar por nome do Aluno" autoComplete="off"
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
        <FormGroup controlId="formControlsFile">
            <Grid fluid>
	        <Row className="show-grid">
	    		<Col xs={12} md={6}><ControlLabel>Nome</ControlLabel><FormControl type="text" placeholder="Nome completo do colaborador" name="nome" defaultValue={aluno.nome} autoFocus/></Col>
	    		<Col xs={12} md={6}><ControlLabel>Apelido</ControlLabel><FormControl type="text" name="apelido" defaultValue={aluno.apelido} placeholder="Apelido"  /></Col>
          	</Row>
	
	        <Row className="show-grid">
	        	<Col xs={12} md={4}>	        
		        	<FormGroup controlId="data_pk">
	    				<ControlLabel>Data de Nascimento</ControlLabel>
	    				<DatePicker placeholder="dd/mm/aaaa" value={aluno.dtNasc} name="dtNasc" onChange={(value) => {AlunosController.state.form.dtNasc=value}} />
	    			</FormGroup>
    			</Col>	
    			<Col xs={12} md={4}><ControlLabel>Natural de</ControlLabel><FormControl type="text" name="naturalDe" defaultValue={aluno.naturalDe} placeholder="Cidade - estado"  /></Col>
	          	<Col xs={12} md={4}>	        
		        	<FormGroup controlId="data_pki">
	    				<ControlLabel>Data de Ingresso</ControlLabel>
	    				<DatePicker placeholder="dd/mm/aaaa" value={aluno.dataDeIngresso} name="dataDeIngresso" onChange={(value) => {AlunosController.state.form.dataDeIngresso=value}} />
	    			</FormGroup>
    			</Col>
	        </Row>
	
	        <Row className="show-grid">
	        <Col xs={12} md={4}><ControlLabel>CPF</ControlLabel><FormControl type="text" name="cpf" defaultValue={aluno.cpf} placeholder="Documento CPF"  /></Col>
        	<Col xs={12} md={4}><ControlLabel>RG</ControlLabel><FormControl type="text" name="rg" defaultValue={aluno.rg} placeholder="Documento RG"  /></Col>
	        	<Col xs={12} md={4}><Input type="text" name="matrAluno" defaultValue={aluno.matrAluno} label="Código de identificação" placeholder="Matricula externa ou paciente"  /></Col>
	        </Row>
	        <Row className="show-grid">	
	        <Col xs={12}><ControlLabel>Endereco</ControlLabel><FormControl type="text" name="endereco" defaultValue={aluno.endereco} placeholder="Rua, número"  /></Col>
	       </Row>
	
	        <Row className="show-grid">
	        <Col xs={12} md={4}><ControlLabel>Email</ControlLabel><FormControl type="text" name="email" defaultValue={aluno.email} placeholder="Email para contato"  /></Col>
        	<Col xs={12} md={4}><ControlLabel>Telefone</ControlLabel><FormControl type="text" name="telefone" defaultValue={aluno.telefone} placeholder="Telefone Fixo"  /></Col>
        	<Col xs={12} md={4}><ControlLabel>Celular</ControlLabel><FormControl type="text" name="celular" defaultValue={aluno.celular} placeholder="Celular com ddd"  /></Col>
	        </Row>
	        <Row className="show-grid">
	        <Col xs={12} md={4}><ControlLabel>Sapato</ControlLabel><FormControl type="text" name="sapato" defaultValue={aluno.sapato} placeholder="Tamanho da sapato"  /></Col>
        	<Col xs={12} md={4}><ControlLabel>Bermuda</ControlLabel><FormControl type="text" name="bermuda" defaultValue={aluno.bermuda} placeholder="Tamanho da bermuda"  /></Col>
        	<Col xs={12} md={4}><ControlLabel>Camiseta</ControlLabel><FormControl type="text" name="camiseta" defaultValue={aluno.camiseta} placeholder="Tamanho da camiseta"  /></Col>
		       </Row>
	        <Row className="show-grid">	
	        	<Col xs={12} md={4}><ControlLabel>Período Escolar</ControlLabel><FormControl type="text" name="periodoEscolar" defaultValue={aluno.periodoEscolar} placeholder="Período Escolar"  /></Col>
	        	<Col xs={12} md={4}><ControlLabel>Transporte</ControlLabel><FormControl type="text" name="transporte" defaultValue={aluno.transporte} placeholder="Transporte"  /></Col>
	        	<Col xs={12} md={4}><ControlLabel>Horário treino</ControlLabel><FormControl type="text" name="horarioTreino" defaultValue={aluno.horarioTreino}  placeholder="Horário de Treino"  /></Col>
	        </Row>
	        <Row className="show-grid">	
	        	<Col xs={12}>
	        	<ControlLabel>Responsável</ControlLabel>
	        		<FormControl componentClass="select" name="responsaveis"
	                   defaultValue={ids(aluno.responsaveis)} onChange={handleAssociationChange} multiple>
	                <option value="">Selecione...</option>
	                {responsaveis.map((element, i) =>
	                    <option key={i} value={element.id}>{element.nome}</option>
	                )}
	            </FormControl>
		        </Col>
	        </Row>
	        <Row className="show-grid">	
        		<Col xs={12}>
        			<ControlLabel>Observações</ControlLabel>
        			<FormControl componentClass="textarea" name="observacoes" defaultValue={aluno.observacoes} placeholder="Detalhes relevantes sobre o aluno"  />
        		</Col>
        	</Row>
        	<Row className="show-grid">	
    			<Col xs={12}>
    				<ControlLabel>Abc</ControlLabel>
    				<FormControl componentClass="textarea" name="abc" defaultValue={aluno.abc} placeholder="Adaptações, limitações e indicações para a criança"  />
    			</Col>
    		</Row>
        	<Row className="show-grid">	
    			<Col xs={12}>
    				<Input type="checkbox" name="ativo" defaultChecked={aluno.ativo} label="Ativo" />
    			</Col>
    		</Row>
	        
      </Grid>
      </FormGroup>
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