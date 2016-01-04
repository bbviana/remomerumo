import React from 'react'
import ReactDOM from 'react-dom'
import {Alunos, GrupoAlunos, Login, Colaboradores, Responsaveis, Atividades, TipoAtividades, AvaliacoesClinicas, AvaliacaoInfoClinicas, InfoClinicas, 
	ModeloAvaliacoesClinicas, TipoInfoClinicas, PlanejamentoAtividades, ExecucaoAtividades, Home, ResumoAlunos} from './views'
import url from 'url'

const queryParams = url.parse(window.location.href, true).query
console.log(queryParams)

if(window.location.search === "?login"){
    // localhost:8080/?login
    ReactDOM.render(<Login />, document.getElementById("app"));
} else if(window.location.search === "?atividades") {
    // localhost:8080/?atividades
    ReactDOM.render(<Atividades />, document.getElementById("app"));
} else if(window.location.search === "?tipoAtividades") {
    // localhost:8080/?tipoAtividades
    ReactDOM.render(<TipoAtividades />, document.getElementById("app"));
} else if(window.location.search === "?avaliacoesClinicas") {
    // localhost:8080/?avaliacoesClinicas
    ReactDOM.render(<AvaliacoesClinicas />, document.getElementById("app"));
} else if(window.location.search === "?infoClinicas") {
    // localhost:8080/?infoClnicas
    ReactDOM.render(<InfoClinicas />, document.getElementById("app"));
} else if(window.location.search === "?colaboradores") {
    // localhost:8080/?colaboradores
    ReactDOM.render(<Colaboradores />, document.getElementById("app"));
} else if(window.location.search === "?responsaveis") {
    // localhost:8080/?responsaveis
    ReactDOM.render(<Responsaveis />, document.getElementById("app"));
} else if(window.location.search === "?grupoAlunos") {
    // localhost:8080/?grupoAlunos
    ReactDOM.render(<GrupoAlunos />, document.getElementById("app"));
} else if(window.location.search === "?tipoInfoClinicas") {
    // localhost:8080/?tipoInfoClinicas
    ReactDOM.render(<TipoInfoClinicas />, document.getElementById("app"));
} else if(window.location.search === "?modeloAvaliacoesClinicas") {
    // localhost:8080/?modeloAvaliacoesClinicas
    ReactDOM.render(<ModeloAvaliacoesClinicas />, document.getElementById("app"));
} else if(window.location.search.startsWith("?planejamentoAtividades")){
    // localhost:8080/?planejamentoAtividades
    ReactDOM.render(<PlanejamentoAtividades id={queryParams.id}/>, document.getElementById("app"));
} else if(window.location.search.startsWith("?execucaoAtividades")){
    // localhost:8080/?execucaoAtividades
    ReactDOM.render(<ExecucaoAtividades id={queryParams.id}/>, document.getElementById("app"));
} else if(window.location.search.startsWith("?avaliacaoInfoClinicas")){
    // localhost:8080/?execucaoAtividades
    ReactDOM.render(<AvaliacaoInfoClinicas id={queryParams.id}/>, document.getElementById("app"));
} else if(window.location.search.startsWith("?resumoAlunos")){
    // localhost:8080/?execucaoAtividades
    ReactDOM.render(<ResumoAlunos id={queryParams.id}/>, document.getElementById("app"));
} else if(window.location.search.startsWith("?alunos")){
    // localhost:8080/?alunos
	ReactDOM.render(<Alunos />, document.getElementById("app"));
} else {
    // localhost:8080/
    ReactDOM.render(<Home />, document.getElementById("app"));
}
