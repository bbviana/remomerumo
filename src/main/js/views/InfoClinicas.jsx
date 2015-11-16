import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {InfoClinicasController} from '../controllers'
import {Input, Row, Col, Grid} from 'react-bootstrap';

class InfoClinicas extends Component {
    componentDidMount = () => InfoClinicasController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por valor da Informação Clinica" autoComplete="off"
               name="valor" degaultValue={search.valor}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Valor</th>
                <th>Tipo</th>
            </tr>,

        body: (infoClinica) =>
            <tr>
                <td>{infoClinica.id}</td>
                <td>{infoClinica.valor}</td>
                <td>{infoClinica.tipo}</td>
            </tr>
    }

    formSchema = (infoClinica, {tipos = []}) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		          	<Col xs={12}><Input type="text" label="Valor" placeholder="Valor" name="valor" defaultValue={infoClinica.nome} autoFocus/></Col>
		        </Row>
	          	 <Row className="show-grid">	
			        	<Col xs={12}>
				        	<Input type="select" label="Tipo" name="tipo"
					                defaultValue={id(infoClinica.tipo)} onChange={handleAssociationChange}>
					            <option value="">Selecione...</option>
					            {tipos.map((element, i) =>
					                <option key={i} value={element.id}>{element.nome}</option>
					            )}
				            </Input>
			            </Col>  	
		        </Row>
	      </Grid>
        </div>

    render = () =>
        <Crud title="Informação Clinica"
              controller={InfoClinicasController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default InfoClinicas