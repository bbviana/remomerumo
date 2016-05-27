import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {TarefasController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class Tarefas extends Component {
    componentDidMount = () => TarefasController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome da Atividade" autoComplete="off"
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
                <td>{tarefa.nome}</td>
                <td>{tarefa.descricao}</td>
            </tr>
    }

    formSchema = (tarefa, {tipos = []}) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12}><Input type="text" label="Nome" placeholder="Nome da Atividade" name="nome" defaultValue={tarefa.nome} autoFocus/></Col>
		        </Row>
		        <Row className="show-grid">
		          	<Col xs={12}><Input type="text" label="Descrição" placeholder="Descrição" name="descricao" defaultValue={tarefa.sigla}/></Col>
		        </Row>
		        <Row className="show-grid">	
		        	<Col xs={12}>
			        	<Input type="select" label="Modalidade" name="tipoAtividade"
				                defaultValue={id(tarefa.tipoAtividade)} onChange={handleAssociationChange}>
				            <option value="">Selecione...</option>
				            {tipos.map((element, i) =>
				                <option key={i} value={element.id}>{element.nome}</option>
				            )}
			            </Input>
		            </Col>
		        </Row>
		        
	      </Grid>
        </div>

    render = () =>
        <Crud title="Atividades"
              controller={TarefasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Tarefas