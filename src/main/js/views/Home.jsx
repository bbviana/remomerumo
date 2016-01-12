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
            <PageHeader><Image src="img/nav-logo-remo.png"  />&nbsp;&nbsp;<Image src="img/nav-logo-instituto.png"  /><strong>&nbsp;&nbsp;Sobre o sistema </strong></PageHeader>
            <Tabs defaultActiveKey={1}>
	            <Tab eventKey={1} title="Pessoas"><p>&nbsp;</p>
	            	<p>Este grupo de conceitos esta relacionado as pessoas envolvidas em nosso instituto, elas foram separadas no sistema em agluns grupos:</p>
	            	<p><strong> <Glyphicon glyph="fire"/>&nbsp;&nbsp;Alunos: </strong>Nossos queridos alunos, no cadastro deste poderemos ver os dados de contato, endereço, responsáveis, além de um resumo de tudo que já foi resgistrado para este aluno.</p>
	            	<p><strong> <Glyphicon glyph="user"/>&nbsp;&nbsp;Responsáveis:</strong> São as pessoas responsáveis pelos alunos do IRMR, um aluno pode ter em seu cadastro mais de um responsável, este cadastro é apenas para aumentar a ratreabilidade sobre as crianças.</p>
	            	<p><strong> <Glyphicon glyph="education"/>&nbsp;&nbsp;Colaboradores:</strong> São todos os profissionais envolvidos nas atividades do IRMR, desde professores a voluntários, este cadastro visa ter uma maior controle e acesso as informações destes profissionais, 
	            	assim como registrar as atividaddes em que eles estão envolvidos junto ao instituto.</p>
	            	<p><strong> <Glyphicon glyph="link"/>&nbsp;&nbsp;Grupo de Alunos:</strong> Os grupos de alunos são usados para facilitar o cadastro das atividades, os grupos são usados para separa os planejamentos e comentários dentro de uma atividade.</p>	            	
	            </Tab>
	            <Tab eventKey={2} title="Atividade"><p>&nbsp;</p>
	            <p>Os cadatsros envolvidos com a atividades desenvolvidas junto aos alunos:</p>
	            <p><strong> <Glyphicon glyph="pencil"/>&nbsp;&nbsp;Tipo de Atividade: </strong>São os tipos de atividades desenvolvidas, tais como Natação, Musculação, Remo, etc..</p>
	            <p><strong> <Glyphicon glyph="flag"/>&nbsp;&nbsp;Atividades: </strong>É o cadastro das atividades como data e tipo de atividade, além disso temos: </p>
	            <li><strong>Planejamento:</strong> O planejamento de uma atividade envolve dizer quais grupos de alunos e colaboradores irão participar da atividade em questão, o sistema usa os Grupo de Alunos pré cadastrados para este fim, separando este planejamento por tipo de atividade e tipo de grupo de cntrole.</li>
	            <li><strong>Execução:</strong> Aqui contamos com a lista de chamada</li>
	            </Tab>
	            <Tab eventKey={3} title="Avaliações"><p>&nbsp;</p>
	            <p>São os cadastros e informações necessárias para preenchimento de uma avalição clinica de um aluno: </p>
	            <p><strong> <Glyphicon glyph="road"/>&nbsp;&nbsp;Modelo de Avaliação Clinica:</strong> Este modelo determmina quais as medidas serão usadas na avaliação clínica deste tipo.</p>
	            <p><strong> <Glyphicon glyph="tags"/>&nbsp;&nbsp;Tipo de Informação Clinica:</strong>São os tipos de informação clinica que podem ser usados em uma avaliação, tais como peso, altura, etc..</p>
	            <p><strong> <Glyphicon glyph="stats"/>&nbsp;&nbsp;Avaliação Clinica:</strong>Representa a efetivação de uma avaliação clínica, escolhido um modelo, um aluno e uma data esta avaliação representará as medições feitas.</p></Tab>
	            <Tab eventKey={4} title="To Do"><p>
	            <strong>Blocker</strong>
	            <li>Planejamento de atividade não esta salvando comentários e planejamento</li>
	            <li>Fazer a tela de resumo do aluno e colocar o link no crud do aluno, nesta tela deveria constar as avaliaçẽs e as presenças/comentários dos alunos na atividades</li>
	            <li>Não esta salvando a informação clinica da avaliacaoinfoclinica</li>
	            <li>Dar feed back ao usuário quando clicar em salvar nas ações</li>
	            <li>Colocar segurança no sistema</li>
	            <li>Comentario da execução de atividade não salva</li>
	            <strong>Desejados</strong>
	            <li>Colocar a data de inicio do aluno no IRMR</li>
	            <li>Upload de arquivos anexos a avaliação e fotos das crianças</li>
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
