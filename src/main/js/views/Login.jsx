import React, {Component, PropTypes} from 'react'

class Login extends Component {
    render = () =>
        <div style={s.app}>
            <div className="container">
                <form style={s.form}>
                    <h2>Login</h2>

                    <label htmlFor="inputEmail" className="sr-only">Email</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email"
                           required autoFocus />

                    <label htmlFor="inputPassword" className="sr-only">Senha</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Senha"
                           required="required" />

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
