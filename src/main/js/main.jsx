import React from 'react'
import ReactDOM from 'react-dom'
import {Alunos, Login} from './views'

if(window.location.search === "?login"){
    // localhost:8080/?login
    ReactDOM.render(<Login />, document.getElementById("app"));
} else {
    // localhost:8080/
    ReactDOM.render(<Alunos />, document.getElementById("app"));
}