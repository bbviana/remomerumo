import React from 'react'
import ReactDOM from 'react-dom'
import {Alunos, GrupoAlunos, Login, Colaboradores, Responsaveis, Atividades, TipoAtividades, AvaliacoesClinicas, InfoClinicas} from './views'

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
} else {
	
    // localhost:8080/
    ReactDOM.render(<Alunos />, document.getElementById("app"));
}