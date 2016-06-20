import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {TipoAtividadesController} from '../controllers'
import {Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid} from 'react-bootstrap';

class TipoAtividades extends Component {
    componentDidMount = () => TipoAtividadesController.list() // Busca inicial

    searchSchema = (search) =>
        <FormControl type="text" placeholder="Buscar por nome do Modalidade" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
            </tr>,

        body: (tipoAtividade) =>
            <tr>
                <td>{tipoAtividade.id}</td>
                <td>{tipoAtividade.nome}</td>
            </tr>
    }

    formSchema = (tipoAtividade, {tipos = []}) =>
        <div>
        <FormGroup controlId="formControlsFile">
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12}><ControlLabel>Nome</ControlLabel><FormControl type="text" placeholder="Nome da Modalidade" name="nome" defaultValue={tipoAtividade.nome} autoFocus/></Col>
		        </Row>
		        <Row className="show-grid">	
		        	<Col xs={12}>
		        		<ControlLabel>Modalidade Pai</ControlLabel>
			        	<FormControl componentClass="select" name="tipoAtividadePai"
				                defaultValue={id(tipoAtividade.tipoAtividadePai)} onChange={handleAssociationChange}>
				            <option value="">Selecione...</option>
				            {tipos.map((element, i) =>
				                <option key={i} value={element.id}>{element.nome}</option>
				            )}
			            </FormControl>
		            </Col>
	            </Row>
		        <Row className="show-grid">
	          	<Col xs={12}><ControlLabel>Observação</ControlLabel><FormControl componentClass="textarea" placeholder="Observações gerais sobre a atividade" name="observacao" defaultValue={tipoAtividade.observacao} /></Col>
	        </Row>
	      </Grid>
	      </FormGroup>
        </div>

    render = () =>
        <Crud title="Modalidade"
              controller={TipoAtividadesController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default TipoAtividades