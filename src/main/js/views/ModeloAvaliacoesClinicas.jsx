import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {ModeloAvaliacoesClinicasController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class ModeloAvaliacoesClinicas extends Component {
    componentDidMount = () => ModeloAvaliacoesClinicasController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome do Modelo de Avaliação Clínica " autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
            </tr>,

        body: (avaliacaoClinica) =>
            <tr>
                <td>{modeloAvaliacaoClinica.id}</td>
                <td>{modeloAvaliacaoClinica.nome}</td>
                <td>{modeloAvaliacaoClinica.descricao}</td>
            </tr>
    }

    formSchema = (modeloAvaliacaoClinica) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12}  md={6}><Input type="text" label="Nome" placeholder="Nome completo da Avaliação" name="nome" defaultValue={modeloAvaliacaoClinica.nome} autoFocus/></Col>
		        </Row>
		        <Row className="show-grid">	
		        	<Col xs={12}>
		        	 <Input type="select" label="Tipos de Informação Clinica" name="tipoInfoClinicas"
		                   defaultValue={ids(modeloAvaliacaoClinica.tipoInfoClinicas)} onChange={handleAssociationChange} multiple>
		                <option value="">Selecione...</option>
		                {tipoInfoClinicas.map((element, i) =>
		                    <option key={i} value={element.id}>{element.nome}</option>
		                )}
		            </Input>
			        </Col>
		        </Row>
		        
		        <Row className="show-grid">
	          		<Col xs={12}><Input type="textarea" label="Descrição" placeholder="Descrição do modelo" name="descricao" defaultValue={modeloAvaliacaoClinica.descricao} autoFocus/></Col>
	          	</Row>
	      </Grid>
        </div>

    render = () =>
        <Crud title="Modelo de Avaliação Clinica"
              controller={ModeloAvaliacoesClinicasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default ModeloAvaliacoesClinicas