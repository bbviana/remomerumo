import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Input, Row, Col, Grid, Panel, Glyphicon, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, NavDropdown, Tabs, Tab} from 'react-bootstrap';

class PlanejamentoAtividades extends Component {
    
    render = () =>
        <div style={s.app}>
        <Navbar fixedTop fluid inverse>
        <NavBrand>
            <a href="?login">Remo meu Rumo</a>
        </NavBrand>
        <Nav>
        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; Pagina Inicial</NavItem>
        </Nav>
        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
            <NavItem eventKey={1} href="?alunos">
                <Glyphicon glyph="fire"/>&nbsp;&nbsp;Alunos
            </NavItem>
            <NavItem eventKey={2} href="?responsaveis">
                <Glyphicon glyph="user"/>&nbsp;&nbsp;Responsáveis
            </NavItem>
            <NavItem eventKey={2} href="?colaboradores">
                <Glyphicon glyph="education"/>&nbsp;&nbsp;Colaboradores
            </NavItem>
            <NavDropdown eventKey={3} title="Mais.." id="collapsible-navbar-dropdown">
		        <MenuItem eventKey="2" href="?grupoAlunos">
		            <Glyphicon glyph="link"/>&nbsp;&nbsp;Grupo de Alunos
		        </MenuItem>
		        <MenuItem eventKey="2" href="?planejamentoGrupos">
                    <Glyphicon glyph="th-list"/>&nbsp;&nbsp;Planejamento de Grupos
                </MenuItem>    
            	<MenuItem eventKey="1" href="?atividades">
                    <Glyphicon glyph="flag"/>&nbsp;&nbsp;Atividade
                </MenuItem>
                <MenuItem eventKey="2" href="?tipoAtividades">
                    <Glyphicon glyph="pencil"/>&nbsp;&nbsp;Tipo de Atividade
                </MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey="3" href="?modeloAvaliacoesClinicas">
                    <Glyphicon glyph="road"/>&nbsp;&nbsp;Modelo de Avaliação Clinica
                </MenuItem>
                <MenuItem eventKey="4" href="?tipoInfoClinicas">
                    <Glyphicon glyph="tags"/>&nbsp;&nbsp;Tipo de Informação Clinica
                </MenuItem>
                <MenuItem eventKey="5" href="?avaliacoesClinicas">
                    <Glyphicon glyph="stats"/>&nbsp;&nbsp;Avaliação Clinica
                </MenuItem>
            </NavDropdown>
            <NavItem eventKey={2} href="?login">
                <Glyphicon glyph="log-out"/>
            </NavItem>
        </Nav>
    </Navbar>
        
            <div className="container-fluid">
            </br>
            <p>Aqui nós explicamos o geral..</p>
            <Tabs defaultActiveKey={1}>
	            <Tab eventKey={1} title="Pessoas"><p>Conteudo 1</p></Tab>
	            <Tab eventKey={2} title="Atividade"><p>Conteudo 2</p></Tab>
	            <Tab eventKey={3} title="Avaliações"><p>Conteudo 3</p></Tab>
	          </Tabs>
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

export default PlanejamentoAtividades
