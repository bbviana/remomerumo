import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Glyphicon, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, NavDropdown, Tabs, Tab, PageHeader} from 'react-bootstrap';

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
            <PageHeader><Image src="img/nav-logo-remo.png"  />&nbsp;&nbsp;Sistema de controle do IRMR </PageHeader>
            <Tabs defaultActiveKey={1}>
	            <Tab eventKey={1} title="Pessoas"><p>&nbsp;</p>
	            	<p>Este grupo de conceitos...</p>
	            	<p><strong> <Glyphicon glyph="fire"/>&nbsp;&nbsp;Alunos: </strong>Nossos queridos alunos, no cadastro deste poderemos ver..</p>
	            	<p><strong> <Glyphicon glyph="user"/>&nbsp;&nbsp;Responsáveis:</strong></p>
	            	<p><strong> <Glyphicon glyph="education"/>&nbsp;&nbsp;Colaboradores:</strong></p>
	            	<p><strong> <Glyphicon glyph="link"/>&nbsp;&nbsp;Grupo de Alunos:</strong></p>
	            	<p><strong> <Glyphicon glyph="th-list"/>&nbsp;&nbsp;Planejamento de Grupos:</strong></p></Tab>
	            <Tab eventKey={2} title="Atividade"><p>&nbsp;</p>
	            <p><strong> <Glyphicon glyph="flag"/>&nbsp;&nbsp;Atividades:</strong></p>
	            <p><strong> <Glyphicon glyph="pencil"/>&nbsp;&nbsp;Tipo de Atividade:</strong></p>
	            </Tab>
	            <Tab eventKey={3} title="Avaliações">
	            <p>&nbsp;</p>
	            <p><strong> <Glyphicon glyph="road"/>&nbsp;&nbsp;Modelo de Avaliação Clinica:</strong></p>
	            <p><strong> <Glyphicon glyph="tags"/>&nbsp;&nbsp;Tipo de Informação Clinica:</strong></p>
	            <p><strong> <Glyphicon glyph="stats"/>&nbsp;&nbsp;Avaliação Clinica:</strong></p></Tab>
	            <Tab eventKey={3} title="To Do"><p>
	            <li>Colocar a inativação nas pessoas e respeitar nas querys dos combos</li>
	            <li>Sumir com o crud de Planejamento de grupo? Usar um para cada tipo de grupo? Sem se preocupar com o tipo de atividade? </li>
	            <li>Planejamento de atividade não esta apagando um colaborador quando da o - e o salvar</li>
	            <li>Planejamento de atividade bug ao excluir a ultima aba, ele sumete direito mas da ruim no layout</li>
	            <li>Fazer a tela de resumo do aluno e colocar o link no crud do aluno, nesta tela deveria constar as avaliaçẽs e as presenças/comentários dos alunos na atividades</li>
	            <li>Não esta salvando a informação clinica da avaliacaoinfoclinica</li>
	            <li>Dar feed back ao usuário quando clicar em salvar nas ações</li>
	            <li>Colocar segurança no sistema</li>
	            </p></Tab>
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
