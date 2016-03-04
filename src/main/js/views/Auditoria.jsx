import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Input, Row, Col, Grid, Glyphicon, Button, Navbar, NavItem, Nav, NavBrand, Panel, Accordion} from 'react-bootstrap';

class Auditoria extends Component {
    state = {
        id: "",
        auditorias: []
    }

    procurarRegistro = () => {
        Request.get('api/auditoria/procurarRegistro', {
            id: this.props.id
        })
        .then(auditoriasRequest => this.setState({
            auditorias: auditoriasRequest
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
	        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; Auditoria</NavItem>
	        </Nav>
	        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
	            <NavItem eventKey={1} href="#">
	                <Glyphicon glyph="flag"/>&nbsp;&nbsp;Entidade : {this.state.nome},&nbsp;{this.state.dataRegistro} 
	            </NavItem>
	            
	            <NavItem eventKey={2} onClick={() => window.close()}>
            		<Glyphicon glyph="remove"/>
            	</NavItem>
	        </Nav>
	    </Navbar>
	    
	    <div>&nbsp;</div>
            <div className="container-fluid">
	            <Accordion>
                {this.state.auditorias.map((auditoria, index) =>
	                <Panel header={auditoria.dataRegistro} eventKey={auditoria.id}>
	    	        	<div>
	                     <Grid fluid>
		    		        <Row className="show-grid">
		    		        	<Col xs={12} md={4}><b>Usuario:</b> {auditoria.usuario}</Col>
		    		        	<Col xs={12} md={4}><b>Operacao:</b> {auditoria.tipoOperacao}</Col>
		    		        	<Col xs={12} md={4}><b>Data:</b> {auditoria.dataRegistro}</Col>
		    		        </Row>
		    		        <Row className="show-grid">
		    		        	<Col xs={12} md={12}><b>Registro:</b> {auditoria.registro}</Col>
		    		        </Row>
		    		       </Grid>
	                    </div>
	                    </Panel>
	                )}
	        	   </Accordion>
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