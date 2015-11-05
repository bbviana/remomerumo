import React, {Component, PropTypes} from 'react'
import {invariant} from '../helpers'

/**
 * Form é um decorator para form com as seguintes funcionalidades:
 *
 * - onChange não lança um evento html, mas sim um objeto do tipo {propertyName: propertyValue}, onde propertyName
 * é o atributo "name" do input que foi alterado
 *
 * - onSubmit executa um  event.preventDefault() antes de invocar o handler
 */
class Form extends Component {
    render = () =>
        <form {...this.props}
            onChange={decorateOnChange(this.props.onChange)}
            onSubmit={decorateOnSubmit(this.props.onSubmit)}>
            {this.props.children}
        </form>
}

const decorateOnChange = (originalHander) => {
    return ({target}) => {
        invariant(target.name, `Especifique o atributo 'name' no elemento ${target}`)

        const newValue = {}
        newValue[target.name] = target.value
        originalHander(newValue)
    }
}

const decorateOnSubmit = (originalHander) => {
    return (event) => {
        event.preventDefault()
        originalHander(event)
    }
}


export default Form