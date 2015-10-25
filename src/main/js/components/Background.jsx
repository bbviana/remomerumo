import React, {Component, PropTypes} from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import {Img} from '../components'

const TIME_TO_SHOW_IMAGE = 5000; //ms

// TODO ReactCSSTransitionGroup tem um bug ao trocar de aba no browser; nao ha patch ainda
class Background extends Component {
    static propTypes = {
        images: PropTypes.array.isRequired
    }

    state = {imageIndex: 0}

    componentDidMount = () => this.interval = setInterval(this.gotoNextImage, TIME_TO_SHOW_IMAGE)
    componentWillUnmount = () => clearInterval(this.interval)

    gotoNextImage = () => {
        var nextIndex = (this.state.imageIndex + 1) % this.props.images.length;
        this.setState({imageIndex: nextIndex});
    }

    render = (styles = this.styles, imgSrc = this.props.images[this.state.imageIndex]) =>
        <div style={styles.container}>
            <CSSTransitionGroup transitionName="carousel">
                <Img style={styles.img} src={imgSrc} key={imgSrc}/>
            </CSSTransitionGroup>
        </div>

    styles = {
        container: {
            height: '100%',
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: -999
        },

        img: {
            position: 'fixed',
            width: '100%'
        }
    }
}

export default Background
