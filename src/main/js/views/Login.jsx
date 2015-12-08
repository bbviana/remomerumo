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
            <div className="container">
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
        </div>
}

const s = {
    app: {
        background: "#EEE",
        height: "100%",
        paddingTop: 40,
        paddingBottom: 40
    },

    form: {
        maxWidth: 330,
        padding: 15,
        margin: "0 auto"
    }
}

export default Login
