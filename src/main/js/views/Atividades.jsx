import React, {Component, PropTypes} from 'react'
import {Button, Glyphicon, Input, Modal, Navbar, NavBrand, Pagination, Table} from 'react-bootstrap';
import {AtividadesController} from '../controllers'

class App extends Component {
    state = AtividadesController.state

    componentDidMount(){
        AtividadesController.listen(this);
        AtividadesController.list();
    }

    componentWillUnmount() {
        AtividadesController.unlisten(this);
    }

    render = () =>
        <div style={styles.app}>
            <Navbar fixedTop={true} fluid={true} inverse={true}>
                <NavBrand><a href="#">Remo meu Rumo</a></NavBrand>
            </Navbar>

            <Content>
               <AtividadesBusca />

                <AtividadesTable list={this.state.atividades} currentPage={this.state.currentPage} totalPages={this.state.totalPages}/>

                <Button style={styles.newButton} bsStyle="primary" onClick={AtividadesController.blank}>
                    <Glyphicon glyph="plus-sign"/> Novo Atividade
                </Button>
            </Content>

            <AtividadeModal show={this.state.showForm} atividade={this.state.atividade}/>
        </div>
}

const Content = (props) =>
	<div style={styles.content}>
        {props.children}
	</div>

class AtividadesBusca extends Component {

    handleSubmit(event){
        event.preventDefault();
        AtividadesController.filter(event.target.value);
    }

    searchButton = (
        <Button bsStyle="primary" type="submit">
            <Glyphicon glyph="search"/> Buscar
        </Button>
    )

    render = () =>
        <form style={styles.search} onSubmit={this.handleSubmit} onChange={this.handleSubmit}>
            <Input type="text" placeholder="Buscar por nome do Atividade" buttonAfter={this.searchButton}/>
        </form>
}

class AtividadesTable extends Component {
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
                {list.map((atividade, i) =>
                    <tr key={i}>
                        <td>{atividade.id}</td>
                        <td>{atividade.nome}</td>
                        <td>{atividade.endereco}</td>
                        <td>
                            <AtividadeActions id={atividade.id}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <Pagination style={styles.pagination}
                        items={totalPages}
                        activePage={currentPage}
                        onSelect={(event, selectedEvent) => AtividadesController.list(selectedEvent.eventKey)}/>
        </div>
}

const AtividadeActions = ({id}) =>
	<div>
        <Button bsStyle="link" onClick={() => AtividadesController.load(id)}>
            <Glyphicon glyph="edit"/>
        </Button>

        <Button bsStyle="link" onClick={() => AtividadesController.remove(id)}>
            <Glyphicon glyph="trash" />
        </Button>
	</div>

class AtividadeModal extends Component {
    componentWillReceiveProps = ({atividade}) => {
        this.state = atividade
    }

    handleChange = ({target}) => {
        const newState = {};
        newState[target.name] = target.value;
        this.setState(newState);
    }

    handleSave = (event) => {
        event.preventDefault();
        AtividadesController.save(this.state);
    }

    render = ({show} = this.props) =>
        <Modal show={show} onHide={AtividadesController.closeForm}>
            <Modal.Header>
                <Modal.Title>Atividade</Modal.Title>
            </Modal.Header>

            <form onChange={this.handleChange} onSubmit={this.handleSave}>
                <Modal.Body>
                    <AtividadeForm {...this.state}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={AtividadesController.closeForm}>Cancelar</Button>
                    <Button bsStyle="primary" type="submit">Salvar</Button>
                </Modal.Footer>
            </form>
        </Modal>
}

const AtividadeForm = ({nome, endereco}) =>
    <div>
        <Input type="text" label="Nome" placeholder="Nome completo do atividade"
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