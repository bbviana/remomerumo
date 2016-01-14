import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {Image} from 'react-bootstrap'

class Login extends Component {
    state = {
        id: "",
        login: "",
        senha: ""
    }

    login = (event) => {
        event.preventDefault()

        Request.post('api/login/logar', {
            id: this.props.id,
            login: this.refs.email.value,
            senha: this.refs.senha.value
        })
        .then(usuario => this.setState({
            id: usuario.id,
            login: usuario.login,
            senha: usuario.senha,
        }))
    }

    render = () =>
        <div style={s.app}>
        	<span style={s.bgTop}></span>
            <div className="container" style={s.container}>
                <form style={s.form} onSubmit={this.login}>
                    <Image src="img/nav-logo-remo.png" responsive />
                    <Image src="img/nav-logo-instituto.png" responsive />

                	<h2>Login</h2>

                    <label className="sr-only">Email</label>
                    <input ref="email" className="form-control" required autoFocus />

                    <label className="sr-only">Senha</label>
                    <input ref="senha" type="password" className="form-control" required="required" />

                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me" /> Lembrar
                        </label>
                    </div>
                  
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                </form>
            </div>
            <span style={s.bgBottom}></span>
        </div>
}

const s = {
    app: {
        background: "#FFF",
        height: "100%",
        paddingTop: 40,
        paddingBottom: 40
    },

    bgTop: {
    	background: 'url(http://www.remomeurumo.com.br/_imagens/background/bg-border-bottom.png) 0 bottom repeat-x',
	    marginBottom: -12,
	    position: 'relative',
	    clear: 'both',
	    display: 'block',
	    height: 55,
	    top: 0,
	    width: '100%',
	    zIndex: 1
    },
    
    bgBottom: {
    	background: 'url(http://www.remomeurumo.com.br/_imagens/background/bg-border-top.png) 0 bottom repeat-x',
	    marginTop: -30,
	    clear: 'both',
	    display: 'block',
	    height: 55,
	    width: '100%',
	    zIndex: 1
    },
    
    container: {
    	background: '#FFF',
	    height: '100%',
	    paddingTop: 40,
	    paddingBottom: 40,
	    backgroundImage: 'url(http://www.remomeurumo.com.br/_imagens/background/imagem2.jpg)',
	    height: 535,
	    width: '100%'
    },
    
    form: {
        maxWidth: 330,
        padding: 15,
        margin: "0 auto"
    }
}

export default Login
