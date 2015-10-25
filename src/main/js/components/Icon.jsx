import React, {Component, PropTypes} from 'react'

class Icon extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired
    }

    render = () =>
        <i className={"fa fa-" + this.props.name}></i>
}

export default Icon
