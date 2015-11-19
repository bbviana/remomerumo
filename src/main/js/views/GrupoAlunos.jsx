import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {GrupoAlunosController} from '../controllers'
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
                <td>Descrição</td>
            </tr>,

        body: (grupoAluno) =>
            <tr>
                <td>{grupoAluno.id}</td>
                <td>{grupoAluno.nome}</td>
                <td>{grupoAluno.descricao}</td>
            </tr>
    }

    formSchema = (grupoAluno) =>
        <div>
            <Grid fluid>
	        <Row className="show-grid">
	          	<Col xs={12}><Input type="text" label="Nome" placeholder="Nome completo do Grupo" name="nome" defaultValue={grupoAluno.nome} autoFocus/></Col>
	        </Row>
	
            <Row className="show-grid">	
            <Col xs={12}><Input type="textarea" label="Descrição" placeholder="Descrição" name="descricao" defaultValue={grupoAluno.descricao}/></Col>
	        </Row>
      </Grid>
        </div>

    render = () =>
        <Crud title="Grupo de Alunos"
              controller={GrupoAlunosController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}


export default GrupoAlunos