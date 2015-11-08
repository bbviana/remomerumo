import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {AvaliacoesClinicasController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class AvaliacoesClinicas extends Component {
    componentDidMount = () => AvaliacoesClinicasController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome da Avaliação" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Data</th>
            </tr>,

        body: (avaliacaoClinica) =>
            <tr>
                <td>{avaliacaoClinica.id}</td>
                <td>{avaliacaoClinica.nome}</td>
                <td>{avaliacaoClinica.data}</td>
            </tr>
    }

    formSchema = (avaliacaoClinica) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12}  md={6}><Input type="text" label="Nome" placeholder="Nome completo da Avaliação" name="nome" defaultValue={avaliacaoClinica.nome} autoFocus/></Col>
		          	<Col xs={12} md={6}><Input type="text" label="Data" placeholder="Data da Avaliacao" name="data" defaultValue={avaliacaoClinica.data} autoFocus/></Col>
		        </Row>
		        <Row className="show-grid">
	          		<Col xs={12}><Input type="textarea" label="Comentário" placeholder="Comentários da Avaliação" name="comentario" defaultValue={avaliacaoClinica.comentario} autoFocus/></Col>
	          	</Row>
	      </Grid>
        </div>

    render = () =>
        <Crud title="Avaliação Clinica"
              controller={AvaliacoesClinicasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default AvaliacoesClinicas