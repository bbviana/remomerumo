import React from 'react'
import ReactDOM from 'react-dom'
import {Alunos, GrupoAlunos, Login, Colaboradores, Responsaveis, Atividades, TipoAtividades, AvaliacoesClinicas, InfoClinicas, ModeloAvaliacoesClinicas, TipoInfoClinicas, PlanejamentoGrupos, PlanejamentoAtividades, ExecucaoAtividades} from './views'

if(window.location.search === "?login"){
    // localhost:8080/?login
    ReactDOM.render(<Login id="42"/>, document.getElementById("app"));
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
} else if(window.location.search === "?planejamentoGrupos") {
    // localhost:8080/?planejamentoGrupos
    ReactDOM.render(<PlanejamentoGrupos />, document.getElementById("app"));
} else if(window.location.search === "?planejamentoAtividades"){
    // localhost:8080/?login
    ReactDOM.render(<PlanejamentoAtividades id="27"/>, document.getElementById("app"));
} else if(window.location.search === "?execucaoAtividades"){
    // localhost:8080/?execucaoAtividades
    ReactDOM.render(<ExecucaoAtividades id="27"/>, document.getElementById("app"));
} else {
	
    // localhost:8080/
    ReactDOM.render(<Alunos />, document.getElementById("app"));
}
