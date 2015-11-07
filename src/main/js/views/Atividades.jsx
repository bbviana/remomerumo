import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {AtividadesController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class Atividades extends Component {
    componentDidMount = () => AtividadesController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome do Atividade" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Comentário</th>
            </tr>,

        body: (atividade) =>
            <tr>
                <td>{atividade.id}</td>
                <td>{atividade.data}</td>
                <td>{atividade.comentario}</td>
            </tr>
    }

    formSchema = (atividade) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		        	<Col xs={12} md={6}><Input type="text" label="Nome" placeholder="Nome completo do aluno" name="nome" defaultValue={atividade.nome} autoFocus/></Col>
		          	<Col xs={12} md={6}><Input type="text" label="Data" placeholder="Data da aula" name="data" defaultValue={atividade.nome} autoFocus/></Col>
		        </Row>
		
		        <Row className="show-grid">
		        	<Col xs={12}><Input type="textarea" label="Comentário" name="comentario" defaultValue={atividade.comentario} placeholder="Comentário"  /></Col>
		        </Row>
		
	      </Grid>
        </div>

    render = () =>
        <Crud title="Atividade"
              controller={AtividadesController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Atividades