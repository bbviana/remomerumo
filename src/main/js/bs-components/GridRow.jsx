import React, { PropTypes, Component } from 'react'
import {GridCol} from '.'
import {invariant} from '../utils'

class GridRow extends Component {

    render = ({children, cols} = this.props) =>
        <div className="row">
            {children.map((child, i) =>
                <GridCol md={cols[i]} key={i}>
                    {child}
                </GridCol>
            )}
        </div>
}

GridRow.propTypes = {
    cols({cols} = props) {
        invariant(cols.reduce((a, b) => a + b) == 12, "A soma das cols deve ser 12.")
    }
}

export default GridRow
