import React, {Component, PropTypes} from 'react'
import {Button, Glyphicon, Input, Modal} from 'react-bootstrap';
import {AlunosController} from '../../controllers'

class Form extends Component {
    componentWillReceiveProps = ({aluno}) => {
        this.state = aluno
    }

    handleChange = ({target}) => {
        const newState = {};
        newState[target.name] = target.value;
        this.setState(newState);
    }

    handleSave = (event) => {
        event.preventDefault();
        AlunosController.save(this.state);
    }

    render = ({show} = this.props) =>
        <Modal show={show} onHide={AlunosController.closeForm}>
            <Modal.Header>
                <Modal.Title>Aluno</Modal.Title>
            </Modal.Header>

            <form onChange={this.handleChange} onSubmit={this.handleSave}>
                <Modal.Body>
                    <FormBody {...this.state}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={AlunosController.closeForm}>Cancelar</Button>
                    <Button bsStyle="primary" type="submit">Salvar</Button>
                </Modal.Footer>
            </form>
        </Modal>
}

const FormBody = ({nome, endereco}) =>
    <div>
        <Input type="text" label="Nome" placeholder="Nome completo do aluno"
               name="nome" defaultValue={nome} autoFocus/>

        <Input type="text" label="Endereço" placeholder="Rua, número"
               name="endereco" defaultValue={endereco} />
    </div>


const styles = {
}

export default Form