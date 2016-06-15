import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {ModeloAvaliacoesClinicasController} from '../controllers'
import {Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid} from 'react-bootstrap';

class ModeloAvaliacoesClinicas extends Component {
    componentDidMount = () => ModeloAvaliacoesClinicasController.list() // Busca inicial

    searchSchema = (search) =>
        <FormControl type="text" placeholder="Buscar por nome do Modelo de Avaliação Clínica " autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
            </tr>,

        body: (modeloAvaliacaoClinica) =>
            <tr>
                <td>{modeloAvaliacaoClinica.id}</td>
                <td>{modeloAvaliacaoClinica.nome}</td>
                <td>{modeloAvaliacaoClinica.descricao}</td>
            </tr>
    }

    formSchema = (modeloAvaliacaoClinica, {tipoInfoClinicas = [], especialidades = []}) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12}  md={6}><ControlLabel>Nome</ControlLabel><FormControl type="text" placeholder="Nome completo da Avaliação" name="nome" defaultValue={modeloAvaliacaoClinica.nome} autoFocus/></Col>
		        </Row>
		        <Row className="show-grid">
		        <Col xs={12}>
		        <ControlLabel>Especialidade</ControlLabel>
	        		<FormControl componentClass="select" name="especialidade"
			                defaultValue={id(modeloAvaliacaoClinica.especialidade)} onChange={handleAssociationChange}>
			            <option value="">Selecione...</option>
			            {especialidades.map((element, i) =>
			                <option key={i} value={element.id}>{element.nome}</option>
			            )}
		            </FormControl>
	            </Col>
	            </Row>
		        <Row className="show-grid">	
		        	<Col xs={12}>
		        	<ControlLabel>Tipos de Informação Clinica</ControlLabel>
		        	<FormControl componentClass="select" name="tipoInfoClinicas"
		                   defaultValue={ids(modeloAvaliacaoClinica.tipoInfoClinicas)} onChange={handleAssociationChange} multiple>
		                <option value="">Selecione...</option>
		                {tipoInfoClinicas.map((element, i) =>
		                    <option key={i} value={element.id}>{element.nome}</option>
		                )}
		            </FormControl>
			        </Col>
		        </Row>
		        
		        <Row className="show-grid">
	          		<Col xs={12}><ControlLabel>Descrição</ControlLabel><FormControl componentClass="textarea" placeholder="Descrição do modelo" name="descricao" defaultValue={modeloAvaliacaoClinica.descricao} /></Col>
	          	</Row>
	      </Grid>
        </div>

    render = () =>
        <Crud title="Modelo de Avaliação"
              controller={ModeloAvaliacoesClinicasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default ModeloAvaliacoesClinicas