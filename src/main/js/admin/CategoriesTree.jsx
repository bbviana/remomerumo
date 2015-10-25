import React, { PropTypes, Component } from 'react'
import {CategoryService} from '../services'

const assign = Object.assign

class CategoriesTree extends Component {
    addCategory = (name) =>
        CategoryService.create({
            name: name,
            subCategories: [],
            main: true
        })

    render = ({categories} = this.props) =>
        <div style={s.tree}>
            {categories.map((category, i) =>
                <CategorySection category={category} key={i} />
            )}

            <AddSection onSave={this.addCategory}/>
        </div>
}

class CategorySection extends Component {
    addSubCategory = (name) =>
        CategoryService.addSubCategory(this.props.category, {name: name})

    render = ({category} = this.props) =>
        <div style={s.categoryNode}>
            <Category style={s.categoryCard} category={category}/>

            {category.subCategories.map((subCategory, i) =>
                <Category category={subCategory} key={i} />
            )}

            <AddSection onSave={this.addSubCategory}/>
        </div>
}

class Category extends Component {
    loadCategory = () => CategoryService.find(this.props.category.id)

    render = ({style, category} = this.props) =>
        <Card style={style} title={category.name} onClick={this.loadCategory}/>
}

const Card = ({style, title, onClick}) =>
    <div style={assign({}, s.card, style)} onClick={onClick}>
        {title}
    </div>


class AddSection extends Component {
    state = { formMode: false }

    gotoFormMode = () => this.setState({formMode: true})

    leaveFormMode = () => this.setState({formMode: false})

    render = ({onSave} = this.props, {formMode} = this.state) =>
        <div>
            {formMode ?
                <AddForm onSave={onSave} onCancel={this.leaveFormMode}/>:
                <Card title="+" onClick={this.gotoFormMode}/>
            }
        </div>
}

class AddForm extends Component {
    onSave = (e) => {
        e.preventDefault();
        this.props.onSave(this.refs.category.value)
        this.props.onCancel()
    }

    render = ({onCancel} = this.props) =>
        <form style={s.form} onSubmit={this.onSave}>
            <input ref="category" type="text" className="form-control" autoFocus={true}/>

            <button type="submit" className="btn btn-primary">
                Save
            </button>
            <button type="button" className="btn" onClick={onCancel}>
                Cancel
            </button>
        </form>
}


const s = {
    tree: {},

    categoryNode: {
        marginBottom: 20
    },

    card: {
        border: '1px solid #666',
        cursor: 'pointer',
        height: 30,
        lineHeight: '30px',
        marginBottom: -1,
        textAlign: 'center'
    },

    categoryCard: {
        background: '#EABCEA'
    },

    form: {}
}

export default CategoriesTree
