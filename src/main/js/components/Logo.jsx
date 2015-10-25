import React, {Component, PropTypes} from 'react'
import {Img} from '.'

//TODO como tornar o href automatico? ou seja, sempre enviar para contextPath?
class Logo extends Component {
    render = (styles = this.styles) =>
        <div style={styles.container} >
            <a style={styles.link} href="/laylamarques">
                <Img src="img/logo.png" />
            </a>
        </div>

    styles = {
        container: {
            textAlign: 'center'
        },

        link: {
            display: 'inline-block'
        }
    }
}

export default Logo
