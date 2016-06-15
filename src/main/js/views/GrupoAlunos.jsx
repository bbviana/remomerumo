import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {GrupoAlunosController} from '../controllers'
import {Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid} from 'react-bootstrap';

class GrupoAlunos extends Component {
    componentDidMount = () => GrupoAlunosController.list() // Busca inicial

    searchSchema = (search) =>
        <FormControl type="text" placeholder="Buscar por nome do Grupo" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Critérios ou Fatores</th>
                <th>Modalidade</th>
            </tr>,

        body: (grupoAluno) =>
            <tr>
                <td>{grupoAluno.id}</td>
                <td>{grupoAluno.nome}</td>
                <td>{grupoAluno.descricao}</td>
                <td>{grupoAluno.tipoAtividade.nome}</td>
            </tr>
    }

    formSchema = (grupoAluno, {tipos = [], colaboradores = [], alunos = [] }) =>
        <div>
        <FormGroup controlId="formControlsFile">
            <Grid fluid>
	        <Row className="show-grid">
	          	<Col xs={12}><ControlLabel>Nome</ControlLabel><FormControl type="text" placeholder="Nome completo do Grupo" name="nome" defaultValue={grupoAluno.nome} autoFocus/></Col>
	        </Row>
	
            <Row className="show-grid">	
            <Col xs={12}><ControlLabel>Critérios ou Fatores</ControlLabel><FormControl type="text" placeholder="Critérios ou Fatores" name="descricao" defaultValue={grupoAluno.descricao}/></Col>
	        </Row>
	        
	        <Row className="show-grid">	
        	<Col xs={12}>
        	<ControlLabel>Modalidade</ControlLabel>
            	<FormControl componentClass="select" name="tipoAtividade"
		                defaultValue={id(grupoAluno.tipoAtividade)} onChange={handleAssociationChange}>
		            <option value="">Selecione...</option>
		            {tipos.map((element, i) =>
		                <option key={i} value={element.id}>{element.nome}</option>
		            )}
	            </FormControl>
            </Col>
        </Row>
        <Row className="show-grid">	
    	<Col xs={12}>
    	<ControlLabel>Alunos</ControlLabel>
        <FormControl componentClass="select" name="alunos"
                   defaultValue={ids(grupoAluno.alunos)} onChange={handleAssociationChange} multiple>
                <option value="">Selecione...</option>
                {alunos.map((element, i) =>
                    <option key={i} value={element.id}>{element.nome}</option>
                )}
            </FormControl>
	        </Col>
        </Row>
        <Row className="show-grid">	
        	<Col xs={12}>
        	<ControlLabel>Colaboradores</ControlLabel>
            <FormControl componentClass="select" name="colaboradores"
                   defaultValue={ids(grupoAluno.colaboradores)} onChange={handleAssociationChange} multiple>
                <option value="">Selecione...</option>
                {colaboradores.map((element, i) =>
                    <option key={i} value={element.id}>{element.nome}</option>
                )}
            </FormControl>
	        </Col>
	    </Row>
      </Grid>
      </FormGroup>
       </div>

    render = () =>
        <Crud title="Grupo de Alunos"
              controller={GrupoAlunosController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}


export default GrupoAlunos