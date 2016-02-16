import React from 'react'
import ReactDOM from 'react-dom'
import {Alunos, GrupoAlunos, Login, Colaboradores, Responsaveis, Atividades, TipoAtividades, AvaliacoesClinicas, AvaliacaoInfoClinicas, InfoClinicas, 
	ModeloAvaliacoesClinicas, TipoInfoClinicas, PlanejamentoAtividades, ExecucaoAtividades, Home, ResumoAlunos, Usuarios, Permissoes, Auditorias, Auditoria} from './views'
import url from 'url'

const queryParams = url.parse(window.location.href, true).query
const pathname = window.location.pathname

if(pathname.endsWith("/login")){
    ReactDOM.render(<Login />, document.getElementById("app"));
} else if(pathname.endsWith("/atividades")) {
    ReactDOM.render(<Atividades />, document.getElementById("app"));
} else if(pathname.endsWith("/tipoAtividades")) {
    ReactDOM.render(<TipoAtividades />, document.getElementById("app"));
} else if(pathname.endsWith("/avaliacoesClinicas")) {
    ReactDOM.render(<AvaliacoesClinicas />, document.getElementById("app"));
} else if(pathname.endsWith("/infoClinicas")) {
    ReactDOM.render(<InfoClinicas />, document.getElementById("app"));
} else if(pathname.endsWith("/colaboradores")) {
    ReactDOM.render(<Colaboradores />, document.getElementById("app"));
} else if(pathname.endsWith("/responsaveis")) {
    ReactDOM.render(<Responsaveis />, document.getElementById("app"));
} else if(pathname.endsWith("/grupoAlunos")) {
    ReactDOM.render(<GrupoAlunos />, document.getElementById("app"));
} else if(pathname.endsWith("/tipoInfoClinicas")) {
    ReactDOM.render(<TipoInfoClinicas />, document.getElementById("app"));
} else if(pathname.endsWith("/modeloAvaliacoesClinicas")) {
    ReactDOM.render(<ModeloAvaliacoesClinicas />, document.getElementById("app"));
} else if(pathname.endsWith("/planejamentoAtividades")){
    ReactDOM.render(<PlanejamentoAtividades id={queryParams.id}/>, document.getElementById("app"));
} else if(pathname.endsWith("/execucaoAtividades")){
    ReactDOM.render(<ExecucaoAtividades id={queryParams.id}/>, document.getElementById("app"));
} else if(pathname.endsWith("/avaliacaoInfoClinicas")){
    ReactDOM.render(<AvaliacaoInfoClinicas id={queryParams.id}/>, document.getElementById("app"));
} else if(pathname.endsWith("/resumoAlunos")){
    ReactDOM.render(<ResumoAlunos id={queryParams.id}/>, document.getElementById("app"));
} else if(pathname.endsWith("/alunos")){
	ReactDOM.render(<Alunos />, document.getElementById("app"));
} else if(pathname.endsWith("/usuarios")){
	ReactDOM.render(<Usuarios />, document.getElementById("app"));
} else if(pathname.endsWith("/permissoes")){
	ReactDOM.render(<Permissoes />, document.getElementById("app"));
} else if(pathname.endsWith("/auditorias")){
	ReactDOM.render(<Auditorias />, document.getElementById("app"));
} else if(pathname.endsWith("/auditoria")){
    ReactDOM.render(<Auditoria id={queryParams.id}/>, document.getElementById("app"));
} else {
    ReactDOM.render(<Home />, document.getElementById("app"));
}
