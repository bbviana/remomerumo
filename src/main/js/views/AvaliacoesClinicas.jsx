import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {AvaliacoesClinicasController} from '../controllers'
import {Button,Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid, Glyphicon} from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker';

class AvaliacoesClinicas extends Component {
    componentDidMount = () => AvaliacoesClinicasController.list() // Busca inicial

    searchSchema = (search) =>
        <FormControl type="text" placeholder="Buscar por data da Avaliação" autoComplete="off"
               name="data" degaultValue={search.data}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Modelo</th>
                <th>Aluno</th>
                <th>Data</th>
            </tr>,

        body: (avaliacaoClinica) =>
            <tr>
                <td>{avaliacaoClinica.id}</td>
                <td>{avaliacaoClinica.modelo.nome}</td>
                <td>{avaliacaoClinica.aluno.nome}</td>
                <td>{avaliacaoClinica.data}</td>
            </tr>,
        actions: (avaliacaoClinica) =>  
        	 <div>
        		<Button id={avaliacaoClinica.id} bsStyle="link" title="Registrar valores" disabled={avaliacaoClinica.fechada} onClick={(id) => window.open("avaliacaoInfoClinicas?id="+avaliacaoClinica.id
        				)} ><Glyphicon glyph="th-list"/></Button>
        	 </div>
    }

    formSchema = (avaliacaoClinica, {modelos = [], alunos = [], tipos = []}) =>
        <div>
        <FormGroup controlId="formControlsFile">
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12}  md={6}>
		          	<ControlLabel>Modelo</ControlLabel>
		          		<FormControl componentClass="select" name="modelo"
			                defaultValue={id(avaliacaoClinica.modelo)} onChange={handleAssociationChange}>
				            <option value="">Selecione...</option>
				            {modelos.map((element, i) =>
				                <option key={i} value={element.id}>{element.nome}</option>
				            )}
			            </FormControl>
		            </Col>
		          	<Col xs={12} md={6}>
		    				<ControlLabel>Data</ControlLabel>
		    				<DatePicker placeholder="dd/mm/aaaa" value={avaliacaoClinica.data} name="data" onChange={(value) => {AvaliacoesClinicasController.state.form.data=value}} />
		          	</Col>
		        </Row>
		        <Row className="show-grid">
		          	<Col xs={12}>
		          	<ControlLabel>Aluno</ControlLabel>
	          		<FormControl componentClass="select"  type="select" name="aluno"
			                defaultValue={id(avaliacaoClinica.aluno)} onChange={handleAssociationChange}>
				            <option value="">Selecione...</option>
				            {alunos.map((element, i) =>
				                <option key={i} value={element.id}>{element.nome}</option>
				            )}
			            </FormControl>
		            </Col>
		        </Row>
		        <Row className="show-grid">
	          		<Col xs={12}><ControlLabel>Comentário</ControlLabel><FormControl componentClass="textarea" label="Comentário" placeholder="Comentários da Avaliação" name="comentario" defaultValue={avaliacaoClinica.comentario} /></Col>
	          	</Row>
	      </Grid>
	      </FormGroup>
        </div>

        
    render = () =>
        <Crud title="Avaliação Clinica"
              controller={AvaliacoesClinicasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default AvaliacoesClinicas