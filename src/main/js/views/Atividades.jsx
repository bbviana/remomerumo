import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {AtividadesController} from '../controllers'
import {Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid, Panel, Glyphicon, Button} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

class Atividades extends Component {
    componentDidMount = () => AtividadesController.list() // Busca inicial

    searchSchema = (search) =>
        <FormControl type="text" placeholder="Buscar por nome do Plano de Aula" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Conteúdo</th>
                <th>Data</th>
            </tr>,

        body: (atividade) =>
            <tr>
                <td>{atividade.id}</td>
                <td>{atividade.nome}</td>
                <td>{atividade.dataFormatada}</td>
            </tr>,
            
       actions: (atividade) =>  
       	 <div>
       		<Button id={atividade.id} bsStyle="link" disabled={atividade.executada} onClick={() => window.open("planejamentoAtividades?id="+atividade.id
       				)} ><Glyphicon glyph="inbox" title="Planejamento"/></Button>
       		<Button id={atividade.id} bsStyle="link" onClick={() => window.open("impressaoAtividades?id="+atividade.id
       	       				)} ><Glyphicon glyph="print" title="Imprimir" /></Button>
       	    <Button id={atividade.id} bsStyle="link" onClick={() => window.open("execucaoAtividades?id="+atividade.id
   	       				)} ><Glyphicon glyph="ok" title="Lista de chamada" /></Button>       	       				
       	 </div>     
            
    }

    formSchema = (atividade, {tipos = [], planejamentos = []}) =>
        <div>
        	<FormGroup controlId="data_pk">
	        <Grid fluid>
		        <Row className="show-grid">	
		        	<Col xs={12}>
		        		<ControlLabel>Modalidade</ControlLabel>
			        	<FormControl componentClass="select" name="tipoAtividade"
				                defaultValue={id(atividade.tipoAtividade)} onChange={handleAssociationChange}>
				            <option value="">Selecione...</option>
				            {tipos.map((element, i) =>
				                <option key={i} value={element.id}>{element.nome}</option>
				            )}
			            </FormControl>
		            </Col>
		        </Row>
				<Row className="show-grid">	
		        	<Col xs={12} md={4}>
	        			<ControlLabel>Data</ControlLabel>
	        			<DatePicker placeholder="Data" value={atividade.data} name="data" onChange={(value) => {AtividadesController.state.form.data=value}} />
		        	</Col>
		        	<Col xs={12} md={8}>
		        		<ControlLabel>Conteúdo</ControlLabel>
			        	<FormControl componentClass="text" placeholder="Conteúdo" name="nome" defaultValue={atividade.nome}/>
		            </Col>
	            </Row>
		        <Row className="show-grid">
		        	<Col xs={12}><ControlLabel>Comentário</ControlLabel>
		        	<FormControl componentClass="textarea" name="comentario" defaultValue={atividade.comentario} placeholder="Comentário"  /></Col>
		        </Row>
	      </Grid>
	      </FormGroup>
        </div>

    render = () =>
        <Crud title="Plano de Aula"
              controller={AtividadesController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Atividades