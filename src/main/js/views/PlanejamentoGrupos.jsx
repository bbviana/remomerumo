import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {PlanejamentoGruposController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class PlanejamentoGrupos extends Component {
    componentDidMount = () => PlanejamentoGruposController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por planejamento" autoComplete="off"
               name="planejamentoDeAula" degaultValue={search.planejamentoDeAula}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Planejamento De Aula</th>
                <th>Comentário</th>
            </tr>,

        body: (planejamentoGrupo) =>
            <tr>
                <td>{planejamentoGrupo.id}</td>
                <td>{planejamentoGrupo.planejamentoDeAula}</td>
                <td>{planejamentoGrupo.comentario}</td>
            </tr>
    }

    formSchema = (planejamentoGrupo) =>
        <div>
            <Grid fluid>
	        <Row className="show-grid">
	          	<Col xs={12}><Input type="textarea" label="Planejamento De Aula" placeholder="Detalhes do Planejamento De Aula" name="planejamentoDeAula" defaultValue={planejamentoGrupo.planejamentoDeAula} autoFocus/></Col>
	        </Row>
	
            <Row className="show-grid">	
            <Col xs={12}><Input type="textarea" label="Comentários" placeholder="Comentários" name="comentario" defaultValue={planejamentoGrupo.comentario}/></Col>
	        </Row>
      </Grid>
        </div>

    render = () =>
        <Crud title="Planejamento de Grupo de Atividades"
              controller={PlanejamentoGruposController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}


export default PlanejamentoGrupos