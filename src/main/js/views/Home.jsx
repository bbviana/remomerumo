import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image, Glyphicon, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, NavDropdown, Tabs, Tab, PageHeader} from 'react-bootstrap';

class Home extends Component {
	
	
    render = () =>
        <div style={s.app}>
       
        <Navbar fixedTop fluid inverse>
        <Navbar.Brand>
            <a href="">Remo meu Rumo</a>
        </Navbar.Brand>
        <Nav>
        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; Pagina Inicial</NavItem>
        </Nav>
        <Nav pullRight eventKey={0}> {/* This is the eventKey referenced */}
        <NavItem eventKey={1} href="alunos">
            <Glyphicon glyph="fire"/>&nbsp;&nbsp;Alunos
        </NavItem>
        <NavItem eventKey={2} href="responsaveis">
            <Glyphicon glyph="eye-open"/>&nbsp;&nbsp;Responsáveis
        </NavItem>
        <NavItem eventKey={2} href="colaboradores">
            <Glyphicon glyph="education"/>&nbsp;&nbsp;Colaboradores
        </NavItem>
        <NavDropdown eventKey={3} title="Mais.." id="collapsible-navbar-dropdown">
        	<MenuItem eventKey="1" href="usuarios">
        		<Glyphicon glyph="user"/>&nbsp;&nbsp;Usuários
        	</MenuItem>
        	<MenuItem eventKey="2" href="permissoes">
        		<Glyphicon glyph="folder-open"/>&nbsp;&nbsp;Permissões
        	</MenuItem>
        	<MenuItem divider/>
	        <MenuItem eventKey="3" href="grupoAlunos">
	            <Glyphicon glyph="link"/>&nbsp;&nbsp;Grupo de Alunos
	        </MenuItem>
        	<MenuItem eventKey="4" href="atividades">
                <Glyphicon glyph="flag"/>&nbsp;&nbsp;Plano de Aula
            </MenuItem>
            <MenuItem eventKey="5" href="tipoAtividades">
                <Glyphicon glyph="pencil"/>&nbsp;&nbsp;Modalidades
            </MenuItem>
            <MenuItem eventKey="15" href="tarefas">
                <Glyphicon glyph="pushpin"/>&nbsp;&nbsp;Banco de Atividades
            </MenuItem>
             <MenuItem eventKey="15" href="equipamentos">
                    <Glyphicon glyph="wrench"/>&nbsp;&nbsp;Equipamentos
                </MenuItem>
            <MenuItem divider/>
            <MenuItem eventKey="6" href="modeloAvaliacoesClinicas">
                <Glyphicon glyph="road"/>&nbsp;&nbsp;Modelo de Avaliação
            </MenuItem>
            <MenuItem eventKey="7" href="especialidadeClinicas">
                <Glyphicon glyph="paperclip"/>&nbsp;&nbsp;Especialidades
            </MenuItem>
            <MenuItem eventKey="8" href="tipoInfoClinicas">
                <Glyphicon glyph="tags"/>&nbsp;&nbsp;Medidas
            </MenuItem>
            <MenuItem eventKey="9" href="avaliacoesClinicas">
                <Glyphicon glyph="stats"/>&nbsp;&nbsp;Avaliação
            </MenuItem>
        </NavDropdown>
        <NavItem eventKey={2} href="login">
            <Glyphicon glyph="log-out"/>
        </NavItem>
    </Nav>
    </Navbar>
        
            <div className="container-fluid">

            <PageHeader><Image src="img/nav-logo-remo.png"  />&nbsp;&nbsp;<Image src="img/nav-logo-instituto.png"  /><strong>&nbsp;&nbsp;Sobre o sistema </strong></PageHeader>
            <Tabs defaultActiveKey={1} id="help-tabs">
	            <Tab eventKey={1} title="Pessoas"><p>&nbsp;</p>
	            	<p>Este grupo de conceitos esta relacionado as pessoas envolvidas em nosso instituto, elas foram separadas no sistema em alguns grupos:</p>
	            	<p><strong> <Glyphicon glyph="fire"/>&nbsp;&nbsp;Alunos:</strong> Nossos queridos alunos, no cadastro deste poderemos ver os dados de contato, endereço, responsáveis, além de um resumo de tudo que já foi resgistrado para este aluno.</p>
	            	<p><strong> <Glyphicon glyph="eye-open"/>&nbsp;&nbsp;Responsáveis:</strong> São as pessoas responsáveis pelos alunos do IRMR, um aluno pode ter em seu cadastro mais de um responsável, este cadastro é apenas para aumentar a ratreabilidade sobre as crianças.</p>
	            	<p><strong> <Glyphicon glyph="education"/>&nbsp;&nbsp;Colaboradores:</strong> São todos os profissionais envolvidos nas atividades do IRMR, desde professores a voluntários, este cadastro visa ter uma maior controle e acesso as informações destes profissionais, 
	            	assim como registrar as atividades em que eles estão envolvidos junto ao instituto.</p>
	            	<p><strong> <Glyphicon glyph="user"/>&nbsp;&nbsp;Usuários:</strong> São as pessoas que podem acessar o sistema, estes estão sempre relacionados ao um colaborador.</p>
	            	<p><strong> <Glyphicon glyph="folder-open"/>&nbsp;&nbsp;Permissões:</strong> São as permissões que dão acesso a partes especificas do Sistema.</p>
	            </Tab>
	            <Tab eventKey={2} title="Atividades"><p>&nbsp;</p>
		            <p>Os cadastros envolvidos com a atividades desenvolvidas junto aos alunos:</p>
		            <p><strong> <Glyphicon glyph="link"/>&nbsp;&nbsp;Grupo de Alunos:</strong> Os grupos de alunos são usados para facilitar o cadastro das atividades, os grupos são usados para separa os planejamentos e comentários dentro de uma atividade.</p>
		            <p><strong> <Glyphicon glyph="pencil"/>&nbsp;&nbsp;Modalidades:</strong> São os tipos de atividades desenvolvidas, tais como Natação, Musculação, Remo, etc..</p>
		            <p><strong> <Glyphicon glyph="pushpin"/>&nbsp;&nbsp;Banco de Atividades:</strong> Formam o banco das atividades que serão utilizadas nos planos de aula</p>
		            <p><strong> <Glyphicon glyph="wrench"/>&nbsp;&nbsp;Equipamentos:</strong> São os equipamentos que podem ser utilizados nas atividades</p>
		            <p><strong> <Glyphicon glyph="flag"/>&nbsp;&nbsp;Plano de Aula:</strong> É o cadastro das atividades com a data e modalidade, além disso temos: </p>
		            <p><li><strong>Planejamento:</strong> O planejamento de uma atividade envolve dizer quais grupos de alunos e colaboradores irão participar da atividade em questão, o sistema usa os Grupo de Alunos pré cadastrados para este fim, separando este planejamento por tipo de atividade e tipo de grupo de controle.</li>
		            <li><strong>Execução:</strong> Aqui contamos com a lista de chamada</li></p>
	            </Tab>
	            <Tab eventKey={3} title="Avaliações"><p>&nbsp;</p>
		            <p>São os cadastros e informações necessárias para preenchimento de uma avalição clinica de um aluno: </p>
		            <p><strong> <Glyphicon glyph="road"/>&nbsp;&nbsp;Modelo de Avaliação:</strong> Este modelo determina quais as medidas serão usadas na avaliação clínica deste tipo.</p>
		            <p><strong> <Glyphicon glyph="paperclip"/>&nbsp;&nbsp;Especialidades:</strong> São agrupamentos para facilitar a organização e cadastro das medições que serão utilizadas</p>
		            <p><strong> <Glyphicon glyph="tags"/>&nbsp;&nbsp;Medidas:</strong> São os tipos de medições que podem ser usados em uma avaliação, tais como peso, altura, etc..</p>
		            <p><strong> <Glyphicon glyph="stats"/>&nbsp;&nbsp;Avaliação:</strong> Representa a efetivação de uma avaliação, escolhido um modelo, um aluno e uma data esta avaliação representará as medições feitas.</p></Tab>
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

export default Home
