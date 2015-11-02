import React, {Component, PropTypes} from 'react'
import {Button, Glyphicon, Input} from 'react-bootstrap';
import {AlunosController} from '../../controllers'


class Busca extends Component {

    handleSubmit = event => {
        console.log(this.refs.nome.value)
        event.preventDefault();
        AlunosController.list({page: 1, search: {nome: this.refs.nome.value}});
    }

    searchButton = (
        <Button bsStyle="primary" type="submit">
            <Glyphicon glyph="search"/> Buscar
        </Button>
    )

    render = () =>
        <form style={styles.search} onSubmit={this.handleSubmit}>
            <Input type="text" placeholder="Buscar por nome do Aluno" buttonAfter={this.searchButton}
                ref="nome"/>
        </form>

}


const styles = {
    search: {
        width: '40%'
    }
}

export default Busca