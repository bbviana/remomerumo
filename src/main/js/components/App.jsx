import React, {Component, PropTypes} from 'react'
import {BackgroundService, CategoryService} from '../services'
import {xhr} from '../utils'
import {AddressSection, Background, ItemList, Logo, Menu, SocialInfoSection} from '../components'

class App extends Component {
    state = {
        backgroundImages: [],
        categories: [],
        items: []
    }

    changeStore = (newState) => {
        let url = newState.items
        xhr.get(url).then(data => this.setState({items: data.items}));
    }

    componentDidMount() {
        // TODO fazer um ajax que volta tudo
        BackgroundService.list().then(data => this.setState({backgroundImages: data}));
        CategoryService.list().then(data => this.setState({categories: data}));
    }

    render = (styles = this.styles, {backgroundImages, categories, items} = this.state) =>
        <div style={styles.container}>
            <Background images={backgroundImages}/>

            <div style={styles.sideMenu}>
                <Logo />
                <Menu changeStore={this.changeStore} categories={categories} />
                <SocialInfoSection />
                <AddressSection />
            </div>

            <div style={styles.center}>
                <ItemList items={items}/>
            </div>
        </div>

    styles = {
        container: {
            height: '100%',
            position: 'relative'
        },
        center: {
            height: '100%',
            marginLeft: 240 // sideMenu.width
        },
        sideMenu: {
            height: '100%',
            left: 0,
            padding: 50,
            position: 'absolute',
            top: 0,
            width: 240
        }
    }
}

export default App
