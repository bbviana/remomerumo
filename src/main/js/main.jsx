import React from 'react'
import ReactDOM from 'react-dom'
import {Alunos, Atividades, Login} from './views'

if(window.location.search === "?login"){
    // localhost:8080/?login
    ReactDOM.render(<Login />, document.getElementById("app"));
} else if(window.location.search === "?atividades") {
    // localhost:8080/?atividades
    ReactDOM.render(<Atividades />, document.getElementById("app"));
} else if(window.location.search === "?colaboradores") {
    // localhost:8080/?colaboradores
    ReactDOM.render(<Colaboradores />, document.getElementById("app"));
} else if(window.location.search === "?responsaveis") {
    // localhost:8080/?responsaveis
    ReactDOM.render(<Responsaveis />, document.getElementById("app"));
} else {
    // localhost:8080/
    ReactDOM.render(<Alunos />, document.getElementById("app"));
}