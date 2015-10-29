import React, {Component, PropTypes} from 'react'

class Button extends Component {

    render = ({children, option} = this.props) =>
        <button type="button" className={`btn btn-${option}`}>
            {children}
        </button>
}

export default Button