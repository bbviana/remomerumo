import React, {Component, PropTypes} from 'react'

class Img extends Component {
    static propTypes: {
        src: PropTypes.string.isRequired,
        style: PropTypes.object
    }

    render = ({style, src} = this.props) =>
        src ? <img style={style} src={"/" + src} /> : null
}

export default Img
