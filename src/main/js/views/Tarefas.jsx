import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {TarefasController} from '../controllers'
import {Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid} from 'react-bootstrap';

class Tarefas extends Component {
    componentDidMount = () => TarefasController.list() // Busca inicial

    searchSchema = (search) =>
        <FormControl type="text" placeholder="Buscar por nome da Atividade" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
            </tr>,

        body: (tarefa) =>
            <tr>
                <td>{tarefa.id}</td>
                <td>{tarefa.nomeCompleto}</td>
                <td>{tarefa.descricao}</td>
            </tr>
    }

    formSchema = (tarefa, {tipos = [], tarefasPai = []}) =>
        <div>
        <FormGroup controlId="formControlsFile">
	        <Grid fluid>
		        <Row className="show-grid">
		        	<Col xs={12} md={6}>
		        		<ControlLabel>Atividade Pai</ControlLabel>
			        	<FormControl componentClass="select" name="tarefaPai"
				                defaultValue={id(tarefa.tarefaPai)} onChange={handleAssociationChange}>
				            <option value="">Selecione...</option>
				            {tarefasPai.map((element, i) =>
				                <option key={i} value={element.id}>{element.nome}</option>
				            )}
			            </FormControl>
		            </Col>
		          	<Col xs={12} md={6}><ControlLabel>Nome</ControlLabel><FormControl type="text" placeholder="Nome da Atividade" name="nome" defaultValue={tarefa.nome} autoFocus/></Col>
		        </Row>
		        <Row className="show-grid">
		          	<Col xs={12}><ControlLabel>Descrição</ControlLabel><FormControl type="text" placeholder="Descrição" name="descricao" defaultValue={tarefa.sigla}/></Col>
		        </Row>
		        <Row className="show-grid">	
		        	<Col xs={12}>
		        		<ControlLabel>Modalidade</ControlLabel>
			        	<FormControl componentClass="select" name="tipoAtividade"
				                defaultValue={id(tarefa.tipoAtividade)} onChange={handleAssociationChange}>
				            <option value="">Selecione...</option>
				            {tipos.map((element, i) =>
				                <option key={i} value={element.id}>{element.nome}</option>
				            )}
			            </FormControl>
		            </Col>
		        </Row>
	      </Grid>
	     </FormGroup>
        </div>

    render = () =>
        <Crud title="Atividades"
              controller={TarefasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Tarefas