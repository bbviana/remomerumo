import React, {Component, PropTypes} from 'react'
import {Button, Glyphicon, Input, Modal, Navbar, NavBrand, Pagination, Table} from 'react-bootstrap';
import {ColaboradoresController} from '../controllers'

class App extends Component {
    state = ColaboradoresController.state

    componentDidMount(){
        ColaboradoresController.listen(this);
        ColaboradoresController.list();
    }

    componentWillUnmount() {
        ColaboradoresController.unlisten(this);
    }

    render = () =>
        <div style={styles.app}>
            <Navbar fixedTop={true} fluid={true} inverse={true}>
                <NavBrand><a href="#">Remo meu Rumo</a></NavBrand>
            </Navbar>

            <Content>
               <ColaboradoresBusca />

                <ColaboradoresTable list={this.state.colaboradores} currentPage={this.state.currentPage} totalPages={this.state.totalPages}/>

                <Button style={styles.newButton} bsStyle="primary" onClick={ColaboradoresController.blank}>
                    <Glyphicon glyph="plus-sign"/> Novo Colaborador
                </Button>
            </Content>

            <ColaboradorModal show={this.state.showForm} colaborador={this.state.colaborador}/>
        </div>
}

const Content = (props) =>
	<div style={styles.content}>
        {props.children}
	</div>

class ColaboradoresBusca extends Component {

    handleSubmit(event){
        event.preventDefault();
        ColaboradoresController.filter(event.target.value);
    }

    searchButton = (
        <Button bsStyle="primary" type="submit">
            <Glyphicon glyph="search"/> Buscar
        </Button>
    )

    render = () =>
        <form style={styles.search} onSubmit={this.handleSubmit} onChange={this.handleSubmit}>
            <Input type="text" placeholder="Buscar por nome do Colaborador" buttonAfter={this.searchButton}/>
        </form>
}

class ColaboradoresTable extends Component {
    render = ({list, currentPage, totalPages} = this.props) =>
        <div>
            <Table striped hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Celular</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {list.map((colaborador, i) =>
                    <tr key={i}>
                        <td>{colaborador.id}</td>
                        <td>{colaborador.nome}</td>
                        <td>{colaborador.email}</td>
                        <td>{colaborador.telefone}</td>
                        <td>{colaborador.celular}</td>
                        <td>
                            <ColaboradorActions id={colaborador.id}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <Pagination style={styles.pagination}
                        items={totalPages}
                        activePage={currentPage}
                        onSelect={(event, selectedEvent) => ColaboradoresController.list(selectedEvent.eventKey)}/>
        </div>
}

const ColaboradorActions = ({id}) =>
	<div>
        <Button bsStyle="link" onClick={() => ColaboradoresController.load(id)}>
            <Glyphicon glyph="edit"/>
        </Button>

        <Button bsStyle="link" onClick={() => ColaboradoresController.remove(id)}>
            <Glyphicon glyph="trash" />
        </Button>
	</div>

class ColaboradorModal extends Component {
    componentWillReceiveProps = ({colaborador}) => {
        this.state = colaborador
    }

    handleChange = ({target}) => {
        const newState = {};
        newState[target.name] = target.value;
        this.setState(newState);
    }

    handleSave = (event) => {
        event.preventDefault();
        ColaboradoresController.save(this.state);
    }

    render = ({show} = this.props) =>
        <Modal show={show} onHide={ColaboradoresController.closeForm}>
            <Modal.Header>
                <Modal.Title>Colaborador</Modal.Title>
            </Modal.Header>

            <form onChange={this.handleChange} onSubmit={this.handleSave}>
                <Modal.Body>
                    <ColaboradorForm {...this.state}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={ColaboradoresController.closeForm}>Cancelar</Button>
                    <Button bsStyle="primary" type="submit">Salvar</Button>
                </Modal.Footer>
            </form>
        </Modal>
}

const ColaboradorForm = ({nome, apelido ,naturalDe ,dtNasc ,cpf ,rg ,endereco ,telefone ,celular ,email ,sapato ,bermuda ,camiseta}) =>
    <div>
        <Input type="text" label="Nome" placeholder="Nome completo do responsavel"
               name="nome" defaultValue={nome} autoFocus/>
		<Input type="text" name="apelido" defaultValue={apelido} label="Apelido" placeholder="Apelido"  />
		<Input type="text" name="naturalDe" defaultValue={naturalDe} label="Natural de" placeholder="Cidade - estado"  />
		<Input type="text" name="dtNasc" defaultValue={dtNasc} label="Data de Nascimento" placeholder="dd/mm/aaaa"  />
		<Input type="text" name="cpf" defaultValue={cpf} label="CPF" placeholder="Documento CPF"  />
		<Input type="text" name="rg" defaultValue={rg} label="RG" placeholder="Documento RG"  />
		<Input type="text" name="endereco" defaultValue={endereco} label="Endereço" placeholder="Rua, número"  />
		<Input type="text" name="telefone" defaultValue={telefone} label="Telefone" placeholder="Telefone Fixo"  />
		<Input type="text" name="celular" defaultValue={celular} label="Celular" placeholder="Celular com ddd"  />
		<Input type="text" name="email" defaultValue={email} label="Email" placeholder="Email para contato"  />
		<Input type="text" name="sapato" defaultValue={sapato} label="Sapato" placeholder="Tamanho da sapato"  />
		<Input type="text" name="bermuda" defaultValue={bermuda} label="Bermuda" placeholder="Tamanho da bermuda"  />
		<Input type="text" name="camiseta" defaultValue={camiseta} label="Camiseta" placeholder="Tamanho da camiseta"  />
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