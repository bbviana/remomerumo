import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {GruppoAlunosController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class GrupoAlunos extends Component {
    componentDidMount = () => GrupoAlunosController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome do Grupo" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
            </tr>,

        body: (grupoAluno) =>
            <tr>
                <td>{grupoAluno.id}</td>
                <td>{grupoAluno.nome}</td>
            </tr>
    }

    formSchema = (grupoAluno, {alunos = []}) =>
        <div>
            <Grid fluid>
	        <Row className="show-grid">
	          	<Col xs={12}><Input type="text" label="Nome" placeholder="Nome completo do Grupo" name="nome" defaultValue={grupoAluno.nome} autoFocus/></Col>
	        </Row>
	
            <Row className="show-grid">	
	        	<Col xs={12}>
	        	 <Input type="select" label="Alunos" name="alunos"
	                   defaultValue={ids(grupoAluno.alunos)} onChange={handleAssociationChange} multiple>
	                <option value="">Selecione...</option>
	                {responsaveis.map((element, i) =>
	                    <option key={i} value={element.id}>{element.nome}</option>
	                )}
	            </Input>
		        </Col>
	        </Row>
      </Grid>
        </div>

    render = () =>
        <Crud title="Grupo de Alunos"
              controller={GruppoAlunosController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}


export default GrupoAlunos