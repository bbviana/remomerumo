import React, {Component, PropTypes} from 'react'

class AddressSection extends Component {
    render = () =>
        <div style={s}>
            Rua Jeroaquara, 406 <br />
            Vila Romana <br />
            São Paulo - SP <br />
            (11) 99410-9856 <br />
        </div>
}

const s = {
    background: '#FFF',
    fontSize: '0.9em',
    padding: 10
}

export default AddressSection
