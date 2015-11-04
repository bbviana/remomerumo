import React, {Component, PropTypes} from 'react'

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
    return (event) => {
        const {target} = event;
        const newValue = {};
        newValue[target.name] = target.value;
        originalHander(newValue);
    }
}

const decorateOnSubmit = (originalHander) => {
    return (event) => {
        event.preventDefault();
        originalHander(event);
    }
}


export default Form