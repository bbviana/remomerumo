import React, {Component, PropTypes} from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

class Menu extends Component {
    static propTypes: {
        categories: PropTypes.array.isRequired
    }

    render = ({changeStore, categories} = this.props) =>
        <div id="menu" className="  no-text-select" >
            {categories.map((category, i) =>
                category.children ?
                    <DropdownMenu changeStore={changeStore} item={category} key={i} /> :
                    <LinkMenu changeStore={changeStore} item={category} key={i}/>
            )}
        </div>
}

class DropdownMenu extends Component {
    state = {open: false}

    toggle = () => this.setState({open: !this.state.open})

    render = ({changeStore, item} = this.props) =>
        <div className="menu-item">
            <div className="menu-title" onClick={this.toggle}>
                {item.name}
            </div>
            <CSSTransitionGroup transitionName="carousel">
                {this.state.open &&
                <SubMenus changeStore={changeStore} items={item.children}/>}
            </CSSTransitionGroup>
        </div>
}

class SubMenus extends Component {
    render = ({changeStore, items} = this.props) =>
        <div className="menu-sub">
            {items.map((item, i) =>
                <LinkMenu changeStore={changeStore} item={item} key={i}/>
            )}
        </div>
}

class LinkMenu extends Component {

    getUrl = () => "items/category/" + this.props.item.id

    onClick = (event) => {
        event.preventDefault();
        this.props.changeStore({items: this.getUrl()})
    }

    render = ({item} = this.props) =>
        <a className="menu-title"  href={this.getUrl()} onClick={this.onClick}>{item.name}</a>
}

// estilos em app.css

export default Menu
