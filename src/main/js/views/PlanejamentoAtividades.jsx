import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Row, Col, Grid, Panel, Glyphicon} from 'react-bootstrap';

class PlanejamentoAtividades extends Component {
    state = {
        id: "",
        nome: "",
        data: "",
        planejamentoGrupos: []
    }

    procurarGrupos = (event) => {
        event.preventDefault()

        Request.post('api/planejamentoAtividades/procurarGrupos', {
            id: this.props.id
        })
        .then(atividade => this.setState({
            id: atividade.id,
            nome: atividade.nome,
            data: atividade.data,
            planejamentoGrupos: atividade.planejamentoGrupos
        }))
    }

    render = () =>
        <div style={s.app}>
            <div className="container">
                <form style={s.form} onSubmit={this.procurarGrupos}>

                    <Panel header="Atividade">  
                        {this.state.id} 
                        {this.state.nome} 
                        {this.state.data}</Panel>
                    
                    	<div>
            	        <Grid fluid>
            		    
            	        {this.state.planejamentoGrupos.map(function(iterador, index){
            	        	return  <Panel  key={index} header={iterador.id}>
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
            	        })}
            	      </Grid>
                    </div>
                    
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Procurar Grupos</button>
                </form>
            </div>
        </div>
}

const s = {
    app: {
        background: "#EEE",
        height: "100%",
        paddingTop: 40,
        paddingBottom: 40
    },

    form: {
        width: "90%",
        padding: 15,
        margin: "0 auto"
    }
}

export default PlanejamentoAtividades
