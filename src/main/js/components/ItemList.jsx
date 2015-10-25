import React, {Component, PropTypes} from 'react'
import {ctx} from '../utils'
import {Img, LightBox} from '../components'


class ItemList  extends Component {

    // TODO alterar para
    // openLightbox = index => this.setState({lightboxOpen: true, lightboxIndex: index})
    openLightbox = index => this.refs.lightbox.open(index)

    render = (styles = this.styles, {items} = this.props) => {
        var lightboxItems = [];
        var itemsElements = [];

        // TODO recuperar w e h do nome do item: "/item/image_50x50.jpg"
        items.forEach((item, i) => {
            lightboxItems.push({
                src: ctx() + "/" + item,
                w: 400,
                h: 600
            });

            itemsElements.push(
                <div style={styles.item} key={i} onClick={this.openLightbox.bind(this, i)}>
                    <Img src={item}/>
                </div>
            )
        });

        return (
            <div style={styles.container}>
                {itemsElements}
                <LightBox ref="lightbox" items={lightboxItems}/>
            </div>
        );
    }

    styles = {
        container: {},
        item: {
            cursor: 'pointer',
            display: 'inline-block',
            margin: 10
        }
    }
}


export default ItemList
