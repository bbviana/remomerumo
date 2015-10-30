import React, {Component, PropTypes} from 'react'
import {Button, Glyphicon, Input, Modal, Navbar, NavBrand, Pagination, Table} from 'react-bootstrap';
import {AlunosController} from '../controllers'

class App extends Component {
    state = AlunosController.state

    componentDidMount(){
        AlunosController.listen(this);
        AlunosController.list();
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
               <AlunosBusca />

                <AlunosTable list={this.state.alunos} currentPage={this.state.currentPage} totalPages={this.state.totalPages}/>

                <Button style={styles.newButton} bsStyle="primary" onClick={AlunosController.blank}>
                    <Glyphicon glyph="plus-sign"/> Novo Aluno
                </Button>
            </Content>

            <AlunoModal show={this.state.showForm} aluno={this.state.aluno}/>
        </div>
}

const Content = (props) =>
	<div style={styles.content}>
        {props.children}
	</div>

class AlunosBusca extends Component {

    handleSubmit(event){
        event.preventDefault();
        AlunosController.filter(event.target.value);
    }

    searchButton = (
        <Button bsStyle="primary" type="submit">
            <Glyphicon glyph="search"/> Buscar
        </Button>
    )

    render = () =>
        <form style={styles.search} onSubmit={this.handleSubmit} onChange={this.handleSubmit}>
            <Input type="text" placeholder="Buscar por nome do Aluno" buttonAfter={this.searchButton}/>
        </form>
}

class AlunosTable extends Component {
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
                            <AlunoActions id={aluno.id}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <Pagination style={styles.pagination}
                        items={totalPages}
                        activePage={currentPage}
                        onSelect={(event, selectedEvent) => AlunosController.goToPage(selectedEvent.eventKey)}/>
        </div>
}

const AlunoActions = ({id}) =>
	<div>
        <Button bsStyle="link" onClick={() => AlunosController.load(id)}>
            <Glyphicon glyph="edit"/>
        </Button>

        <Button bsStyle="link" onClick={() => AlunosController.remove(id)}>
            <Glyphicon glyph="trash" />
        </Button>
	</div>

class AlunoModal extends Component {
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
                    <AlunoForm {...this.state}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={AlunosController.closeForm}>Cancelar</Button>
                    <Button bsStyle="primary" type="submit">Salvar</Button>
                </Modal.Footer>
            </form>
        </Modal>
}

const AlunoForm = ({nome, endereco}) =>
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

    newButton: {
        margin: 20
    },

    pagination: {
        float: 'right'
    },

    search: {
        width: '40%'
    }
}

export default App