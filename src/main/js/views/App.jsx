import React, {Component, PropTypes} from 'react'
import {Button, Glyphicon, Input, Modal, Navbar, NavBrand, Table} from 'react-bootstrap';
import {AlunosService} from '../services'

class App extends Component {
    state = {
        alunos: [],
        aluno: {},
        showForm: false
    }

    componentDidMount(){
        AlunosService.listen(this);
        AlunosService.list();
    }

    componentWillUnmount() {
        AlunosService.unlisten(this);
    }

    render = ({alunos, aluno, showForm} = this.state) =>
        <div style={s}>
            <Navbar fixedTop={true} fluid={true} inverse={true}>
                <NavBrand><a href="#">Remo meu Rumo</a></NavBrand>
            </Navbar>

            <AlunosTable alunos={alunos}/>

            <AlunoModal show={showForm} aluno={aluno}/>
        </div>
}

const AlunosTable = ({alunos}) =>
    <Table striped hover>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        {alunos.map((aluno, i) =>
            <tr key={i}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>
                    <AlunoActions id={aluno.id}/>
                </td>
            </tr>
        )}
        </tbody>
    </Table>

const AlunoActions = ({id}) =>
	<div>
        <Button bsStyle="link" onClick={() => AlunosService.find(id)}>
            <Glyphicon glyph="pencil"/>
        </Button>

        <Button bsStyle="link">
            <Glyphicon glyph="trash"/>
        </Button>
	</div>

const AlunoModal = ({show, aluno}) =>
    <Modal show={show} onHide={AlunosService.closeForm}>
        <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <AlunoForm aluno={aluno}/>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={AlunosService.closeForm}>Cancelar</Button>
            <Button bsStyle="primary">Salvar</Button>
        </Modal.Footer>
    </Modal>

class AlunoForm extends Component {
    constructor(props){
        super(props);
        this.state = this.props.aluno;
    }

    handleChange = ({target}) => {
        const newState = {};
        newState[target.name] = target.value;
        this.setState(newState);
    }

    render = ({nome} = this.state) =>
        <form>
            <Input type="text" label="Nome" placeholder="Nome completo do aluno" name="nome" value={nome}
                onChange={this.handleChange}/>
        </form>
}

const s = {
    paddingTop: 50
}

export default App