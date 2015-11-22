import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {AtividadesController} from '../controllers'
import {Input, Row, Col, Grid, Panel, Glyphicon} from 'react-bootstrap';

class Atividades extends Component {
    componentDidMount = () => AtividadesController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome do Atividade" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Data</th>
                <th>Comentário</th>
            </tr>,

        body: (atividade) =>
            <tr>
                <td>{atividade.id}</td>
                <td>{atividade.nome}</td>
                <td>{atividade.data}</td>
                <td>{atividade.comentario}</td>
            </tr>
    }

    formSchema = (atividade, {tipos = [], planejamentos = []}) =>
        <div>
	        <Grid fluid>
		        <Row className="show-grid">
		        	<Col xs={12} md={6}><Input type="text" label="Nome" placeholder="Nome da Atividade" name="nome" defaultValue={atividade.nome} autoFocus/></Col>
		          	<Col xs={12} md={6}><Input type="text" label="Data" placeholder="Data da aula" name="data" defaultValue={atividade.data}/></Col>
		        </Row>
		
		        <Row className="show-grid">
		        	<Col xs={12}><Input type="textarea" label="Comentário" name="comentario" defaultValue={atividade.comentario} placeholder="Comentário"  /></Col>
		        </Row>
		        <Row className="show-grid">	
	        	<Col xs={12}>
		        	<Input type="select" label="Tipo de Atividade" name="tipoAtividade"
			                defaultValue={id(atividade.tipoAtividade)} onChange={handleAssociationChange}>
			            <option value="">Selecione...</option>
			            {tipos.map((element, i) =>
			                <option key={i} value={element.id}>{element.nome}</option>
			            )}
		            </Input>
	            </Col>
            </Row>
            {planejamentos.map((iterador, i) =>
            <Panel header={iterador.id}>
	            <Row className="show-grid">
	        		<Col xs={6} md={2}>Alunos</Col>
	        		<Col xs={6} md={2}>Colaboradores</Col>
	        		<Col xs={12} md={4}>Comentarios</Col>
	        		<Col xs={12} md={4}>Planejamento</Col>
	          	</Row>
	          	<Row className="show-grid">
	          		<Col xs={6} md={2}>Aluno&nbsp;<Glyphicon glyph="minus"/></Col>
	          		<Col xs={6} md={2}>Colaborador B&nbsp;<Glyphicon glyph="minus"/></Col>
	          		<Col xs={12} md={4}><Input type="textarea" label="" name="comentario" defaultValue={iterador.comentario} placeholder="Comentário"  /></Col>
	          		<Col xs={12} md={4}><Input type="textarea" label="" name="planejamentoDeAula" defaultValue={iterador.planejamentoDeAula} placeholder="Planejamento de aula"  /></Col>
	          	</Row>
	          	</Panel>
            )}
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