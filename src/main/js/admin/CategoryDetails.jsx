import React, { PropTypes, Component } from 'react'
import {CategoryService} from '../services'

class CategoryDetails extends Component {
    state = {
        id: null,
        name: null,
        items: []
    }

    componentWillReceiveProps = ({category}) => this.setState(category)

    onChangeName = ({target}) => this.setState({name: target.value})

    onSave = (e) => {
        e.preventDefault();
        let {id, name} = this.state;
        CategoryService.save({id, name})
    }

    render = ({name, items} = this.state) =>
        <form style={s.details} onSubmit={this.onSave}>
            <h2>Cetegoria</h2>

            <input type="text" className="form-control" value={name} onChange={this.onChangeName}/>

            <button type="submit" className="btn btn-primary">
                Save
            </button>
            <button type="button" className="btn">
                Cancel
            </button>

            <hr/>

            <ItemsArea items={items}/>
        </form>
}

class ItemsArea extends Component {
    render = ({items} = this.props) =>
        <div style={s.items}>
            {items.map((item, i) =>
                <div key={i}>{item.description}</div>
            )}
        </div>
}

const s = {
    details: {},
    items: {}
}

export default CategoryDetails
