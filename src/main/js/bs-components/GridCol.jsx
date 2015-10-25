import React, { PropTypes, Component } from 'react'

class GridCol extends Component {

    render = ({children, md} = this.props) =>
        <div className={"col-md-" + md + " col-sm-" + md}>
            {children}
        </div>
}

export default GridCol
