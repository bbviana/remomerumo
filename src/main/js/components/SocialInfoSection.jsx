import React, {Component, PropTypes} from 'react'
import {Img} from '.'

//TODO linkedin? loja? blog?
class SocialInfoSection extends Component {
    render = (styles = this.styles) =>
        <div style={styles.container}>
            <a style={styles.link} href="https://www.facebook.com/layla.marques.568" target="_blank" title="Facebook" >
                <Img src="img/social/facebook.gif" />
            </a>

            <a style={styles.link} href="https://instagram.com/laylamrs/" target="_blank" title="Instagram">
                <Img src="img/social/instagram.gif" />
            </a>
        </div>

    styles = {
        container: {},
        link: {
            marginRight: 5
        }
    }
}

export default SocialInfoSection
