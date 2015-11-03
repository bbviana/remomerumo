import React, {Component, PropTypes} from 'react'
import {Button, Glyphicon, Input, Modal, Navbar, NavBrand, Pagination, Table} from 'react-bootstrap';
import {AlunosController} from '../controllers'

class Alunos extends Component {
    state = AlunosController.state

    componentDidMount(){
        AlunosController.listen(this);
        AlunosController.list({page: 1});
    }

    componentWillUnmount() {
        AlunosController.unlisten(this);
    }

    render = () =>
        <div style={styles.app}>
            <Navbar fixedTop={true} fluid={true} inverse={true}>
                <NavBrand><a href="#">Remo meu Rumo</a></NavBrand>
            </Navbar>

            <Content>
                <Busca value={this.state.search}/>

                <Lista list={this.state.alunos} currentPage={this.state.currentPage} totalPages={this.state.totalPages}/>

                <Button style={styles.newButton} bsStyle="primary" onClick={AlunosController.blank}>
                    <Glyphicon glyph="plus-sign"/> Novo Aluno
                </Button>
            </Content>

            <Form show={this.state.showForm} aluno={this.state.aluno}/>
        </div>
}

const Content = (props) =>
	<div style={styles.content}>
        {props.children}
	</div>


class Busca extends Component {
    state = {
        nome: null
    }

    componentWillReceiveProps = ({value}) => {
        this.state = value
    }

    handleChange = ({target}) => {
        const newState = {};
        newState[target.name] = target.value;
        this.setState(newState);
    }

    handleSubmit = event => {
        event.preventDefault();
        AlunosController.list({page: 1, search: this.state});
    }

    searchButton = (
        <Button bsStyle="primary" type="submit">
            <Glyphicon glyph="search"/> Buscar
        </Button>
    )

    render = () =>
        <form style={styles.search} onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <Input type="text" placeholder="Buscar por nome do Aluno" buttonAfter={this.searchButton}
                name="nome" defaultValue={this.state.nome}/>
        </form>

}


class Lista extends Component {
    handleSelectPage = (event, selectedEvent) => {
        AlunosController.list({page: selectedEvent.eventKey})
    }

    render = ({list, currentPage, totalPages} = this.props) =>
        <div>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {list.map((aluno, i) =>
                    <tr key={i}>
                        <td>{aluno.id}</td>
                        <td>{aluno.nome}</td>
                        <td>{aluno.endereco}</td>
                        <td>
                            <Acoes id={aluno.id}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <Pagination style={styles.pagination}
                        items={totalPages}
                        activePage={currentPage}
                        onSelect={this.handleSelectPage}/>
        </div>
}



const Acoes = ({id}) =>
    <div>
        <Button bsStyle="link" onClick={() => AlunosController.load(id)}>
            <Glyphicon glyph="edit"/>
        </Button>

        <Button bsStyle="link" onClick={() => AlunosController.remove(id)}>
            <Glyphicon glyph="trash" />
        </Button>
    </div>



class Form extends Component {
    componentWillReceiveProps = ({aluno}) => {
        this.state = aluno
    }

    handleChange = ({target}) => {
        const newState = {};
        newState[target.name] = target.value;
        this.setState(newState);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        AlunosController.save(this.state);
    }

    render = ({show} = this.props) =>
        <Modal show={show} onHide={AlunosController.closeForm}>
            <Modal.Header>
                <Modal.Title>Aluno</Modal.Title>
            </Modal.Header>

            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
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
    app: {
        paddingTop: 50
    },

    content: {
        padding: 20
    },

    pagination: {
        float: 'right'
    },

    newButton: {
        margin: 20
    },

    search: {
        width: '40%'
    }
}

export default Alunos