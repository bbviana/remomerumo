import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Input, Row, Col, Grid, Panel, Glyphicon, Button, Navbar, NavItem, Nav, NavBrand} from 'react-bootstrap';

class Auditoria extends Component {
    state = {
        id: "",
        nome: "",
        tipoOperacao: "",
        dataRegistro: "",
        registro: "",
        usuario: ""
    }

    procurarRegistro = () => {
        Request.get('api/auditoria/procurarRegistro', {
            id: this.props.id
        })
        .then(auditoria => this.setState({
            id: auditoria.id,
            nome: auditoria.nome,
            dataRegistro: auditoria.dataRegistro,
            registro: auditoria.registro,
            usuario: auditoria.usuario.nome,
            tipoOperacao: auditoria.tipoOperacao
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
        
            <div className="container-fluid">
                <form style={s.form}>
                    <div>
                     <Grid fluid>
	    		        <Row className="show-grid">
	    		        	<Col xs={12} md={4}><b>Usuario:</b> {this.state.usuario}</Col>
	    		        	<Col xs={12} md={4}><b>Operacao:</b> {this.state.tipoOperacao}</Col>
	    		        	<Col xs={12} md={4}><b>Data:</b> {this.state.dataRegistro}</Col>
	    		        </Row>
	    		        <Row className="show-grid">
	    		        	<Col xs={12} md={12}><b>Registro:</b> {this.state.registro}</Col>
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