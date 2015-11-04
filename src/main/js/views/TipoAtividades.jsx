import React, {Component, PropTypes} from 'react'
import {Button, Glyphicon, Input, Modal, Navbar, NavBrand, Pagination, Table} from 'react-bootstrap';
import {TipoAtividadesController} from '../controllers'

class App extends Component {
    state = TipoAtividadesController.state

    componentDidMount(){
        TipoAtividadesController.listen(this);
        TipoAtividadesController.list();
    }

    componentWillUnmount() {
        TipoAtividadesController.unlisten(this);
    }

    render = () =>
        <div style={styles.app}>
            <Navbar fixedTop={true} fluid={true} inverse={true}>
                <NavBrand><a href="#">Remo meu Rumo</a></NavBrand>
            </Navbar>

            <Content>
               <TipoAtividadesBusca />

                <TipoAtividadesTable list={this.state.tipoAtividades} currentPage={this.state.currentPage} totalPages={this.state.totalPages}/>

                <Button style={styles.newButton} bsStyle="primary" onClick={TipoAtividadesController.blank}>
                    <Glyphicon glyph="plus-sign"/> Novo TipoAtividade
                </Button>
            </Content>

            <TipoAtividadeModal show={this.state.showForm} tipoAtividade={this.state.tipoAtividade}/>
        </div>
}

const Content = (props) =>
	<div style={styles.content}>
        {props.children}
	</div>

class TipoAtividadesBusca extends Component {

    handleSubmit(event){
        event.preventDefault();
        TipoAtividadesController.filter(event.target.value);
    }

    searchButton = (
        <Button bsStyle="primary" type="submit">
            <Glyphicon glyph="search"/> Buscar
        </Button>
    )

    render = () =>
        <form style={styles.search} onSubmit={this.handleSubmit} onChange={this.handleSubmit}>
            <Input type="text" placeholder="Buscar por nome do TipoAtividade" buttonAfter={this.searchButton}/>
        </form>
}

class TipoAtividadesTable extends Component {
    render = ({list, currentPage, totalPages} = this.props) =>
        <div>
            <Table striped hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {list.map((tipoAtividade, i) =>
                    <tr key={i}>
                        <td>{tipoAtividade.id}</td>
                        <td>{tipoAtividade.nome}</td>
                        <td>
                            <TipoAtividadeActions id={tipoAtividade.id}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <Pagination style={styles.pagination}
                        items={totalPages}
                        activePage={currentPage}
                        onSelect={(event, selectedEvent) => TipoAtividadesController.list(selectedEvent.eventKey)}/>
        </div>
}

const TipoAtividadeActions = ({id}) =>
	<div>
        <Button bsStyle="link" onClick={() => TipoAtividadesController.load(id)}>
            <Glyphicon glyph="edit"/>
        </Button>

        <Button bsStyle="link" onClick={() => TipoAtividadesController.remove(id)}>
            <Glyphicon glyph="trash" />
        </Button>
	</div>

class TipoAtividadeModal extends Component {
    componentWillReceiveProps = ({tipoAtividade}) => {
        this.state = tipoAtividade
    }

    handleChange = ({target}) => {
        const newState = {};
        newState[target.name] = target.value;
        this.setState(newState);
    }

    handleSave = (event) => {
        event.preventDefault();
        TipoAtividadesController.save(this.state);
    }

    render = ({show} = this.props) =>
        <Modal show={show} onHide={TipoAtividadesController.closeForm}>
            <Modal.Header>
                <Modal.Title>TipoAtividade</Modal.Title>
            </Modal.Header>

            <form onChange={this.handleChange} onSubmit={this.handleSave}>
                <Modal.Body>
                    <TipoAtividadeForm {...this.state}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={TipoAtividadesController.closeForm}>Cancelar</Button>
                    <Button bsStyle="primary" type="submit">Salvar</Button>
                </Modal.Footer>
            </form>
        </Modal>
}

const TipoAtividadeForm = ({nome}) =>
    <div>
        <Input type="text" label="Nome" placeholder="Nome completo do Tipo de Atividade"
               name="nome" defaultValue={nome} autoFocus/>

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