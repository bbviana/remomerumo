import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components'
import {Admin} from './admin'

if(window.location.search === "?admin"){
    ReactDOM.render(<Admin />, document.getElementById("app"));
} else {
    ReactDOM.render(<App />, document.getElementById("app"));
}
