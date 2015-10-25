import React, { PropTypes, Component } from 'react'
import {GridRow} from '../bs-components'
import {CategoriesTree, CategoryDetails, ItemDetails} from '.'
import {CategoryService} from '../services'

class Admin extends Component {
    state = {
        categories: [],
        category: {}
    }

    componentDidMount = () => {
        CategoryService.listen(this);
        CategoryService.list();
    }

    render = ({categories, category} = this.state) =>
        <div style={s.admin}>
            <Header />
            <Content categories={categories} category={category} />
        </div>
}

const Header = () =>
    <div style={s.header}>
        lm
    </div>

const Content = ({categories, category}) =>
    <div style={s.content} className="container-fluid">
        <GridRow cols={[3, 5, 4]}>
            <CategoriesTree categories={categories}/>
            <CategoryDetails category={category}/>
            <ItemDetails />
        </GridRow>
    </div>


const s = {
    admin: {},

    header: {
        backgroundColor: 'purple',
        color: '#FFF',
        height: 30,
        lineHeight: '30px',
        marginBottom: 10,
        paddingLeft: 10
    },

    content: {

    }
}

export default Admin
