import React, {Component, PropTypes} from 'react'

class Glyphicon extends Component {

    render = ({name} = this.props) =>
        <i className={`glyphicon glyphicon-${name}`}></i>
}

export default Glyphicon