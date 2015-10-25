import React, {PropTypes, Component} from 'react'

class LoadingWindow extends Component {

    render = (s = this.s) =>
        <div style={s.container}>
            <div style={s.inner}>
                <i className="fa fa-spin fa-spinner"></i>
            </div>
        </div>

    s = {
        container: {
            backgroundColor: '#e5e5e5',
            bottom: 0,
            display: 'table',
            fontSize: 100,
            height: '100%',
            left: 0,
            opacity: .8,
            position: 'fixed',
            right: 0,
            top: 0,
            width: '100%',
            zIndex: 20000
        },

        inner: {
            display: 'table-cell',
            textAlign: 'center',
            verticalAlign: 'middle'
        }
    }
}

export default LoadingWindow
