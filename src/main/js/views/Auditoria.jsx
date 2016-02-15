import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {id, ids, handleAssociationChange} from '../crud/Associations'
import {AuditoriaController} from '../controllers'
import {Input, Row, Col, Grid, Panel, Glyphicon, Button, Navbar, NavItem, Nav} from 'react-bootstrap';

class Auditoria extends Component {
    state = {
        id: "",
        nome: ""
    }

    procurarRegistro = () => {
        Request.get('api/auditoria/procurarRegistro', {
            id: this.props.id
        })
        .then(auditoria => this.setState({
            id: auditoria.id,
            nome: auditoria.nome,
            dataRegistro: auditoria.dataRegistro,
            registro: auditoria.registro
        }))
    }
    
    componentDidMount = () => {
    	this.procurarRegistro()
    }
    
    render = () =>
        <div style={s.app}>
        <Navbar fixedTop fluid inverse>
	        <NavBrand>
	            <a href="?login">Remo meu Rumo</a>
	        </NavBrand>
	        <Nav>
	        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; Planejamento de Atividades</NavItem>
	        </Nav>
	        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
	            <NavItem eventKey={1} href="#">
	                <Glyphicon glyph="flag"/>&nbsp;&nbsp;Atividade : {this.state.nome},&nbsp;{this.state.data} 
	            </NavItem>
	            
	            <NavItem eventKey={2} onClick={() => window.close()}>
            		<Glyphicon glyph="remove"/>
            	</NavItem>
	        </Nav>
	    </Navbar>
        
            <div className="container-fluid">
                <form style={s.form}>
                    <div>
                     <Grid fluid>
	    		        <Row className="show-grid">
	    		        	<Col xs={12} md={6}><Input type="text" disabled label="Nome" name="nome" defaultValue={nome}/></Col>
	    		        	<Col xs={12} md={6}><Input type="text" disabled label="dataRegistro" name="dataRegistro" defaultValue={dataRegistro} /></Col>
	    		        </Row>
	    		        <Row className="show-grid">
	    		        	<Col xs={12} md={12}><Input type="textarea" disabled label="Descrição" placeholder="Descrição" name="registro" defaultValue={registro}/></Col>
	    		        </Row>
	    		       </Grid>
                    </div>
                </form>
            </div>
        </div>
}

const s = {
    form: {
        padding: 15,
        margin: "0 auto"
    },
    
    button: {
    	cursor: "pointer"
    },
    app: {
        paddingTop: 50
    }
}
export default Auditoria