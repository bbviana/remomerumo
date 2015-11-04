import React, {Component, PropTypes} from 'react'
import {AtividadesController} from '../controllers'
import {Button, Glyphicon, Input, Modal, Navbar, NavBrand, Pagination, Table} from 'react-bootstrap';
import {Form} from '../components'

class Atividades extends Component {
    state = AtividadesController.state

    componentDidMount(){
        AtividadesController.listen(this); // escuta alterações do state de AtividadesController e redesenha a tela
        AtividadesController.list(); // Busca inicial
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
                <Busca bean={this.state.search}/>

                <Lista list={this.state.atividades}
                       currentPage={this.state.currentPage}
                       totalPages={this.state.totalPages}
                       pageSize={this.state.pageSize}/>

                <Button style={styles.newButton} bsStyle="primary" onClick={() => AtividadesController.load(null)}>
                    <Glyphicon glyph="plus-sign"/> Novo Atividade
                </Button>
            </Content>

            <Formulario show={this.state.showForm} bean={this.state.atividade}/>
        </div>
}

const Content = (props) =>
	<div style={styles.content}>
        {props.children}
	</div>


class Busca extends Component {
    searchButton = (
        <Button bsStyle="primary" type="submit">
            <Glyphicon glyph="search"/> Buscar
        </Button>
    )

    render = ({bean} = this.props) =>
        <Form style={styles.search} onChange={AtividadesController.changeSearch} onSubmit={AtividadesController.list}>
            <Input type="text" placeholder="Buscar por nome do Atividade" autoComplete="off"
                   buttonAfter={this.searchButton} name="nome" degaultValue={bean.nome}/>
        </Form>

}

class Lista extends Component {
    render = ({list, currentPage, totalPages, pageSize} = this.props) =>
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
                {list.map((atividade, i) =>
                    <tr key={i}>
                        <td>{atividade.id}</td>
                        <td>{atividade.nome}</td>
                        <td>
                            <Acoes id={atividade.id}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <div>
                <Pagination style={styles.pagination}
                            items={totalPages}
                            activePage={currentPage}
                            onSelect={this.handleSelectPage}/>

                <select style={styles.pageSize} className="form-control"
                        value={pageSize}
                        onChange={({target}) => AtividadesController.list({pageSize:target.value})}>
                    <option value="5" >5</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
}


const Acoes = ({id}) =>
    <div>
        <Button bsStyle="link" onClick={() => AtividadesController.load(id)}>
            <Glyphicon glyph="edit"/>
        </Button>

        <Button bsStyle="link" onClick={() => AtividadesController.remove(id)}>
            <Glyphicon glyph="trash" />
        </Button>
    </div>



class Formulario extends Component {
    render = ({show, bean} = this.props) =>
        <Modal show={show} onHide={AtividadesController.closeForm}>
            <Modal.Header>
                <Modal.Title>Atividade</Modal.Title>
            </Modal.Header>

            <Form onChange={AtividadesController.changeForm} onSubmit={AtividadesController.save}>
                <Modal.Body>
                    <FormularioContent {...bean}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={AtividadesController.closeForm}>Cancelar</Button>
                    <Button bsStyle="primary" type="submit">Salvar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
}

const FormularioContent = ({nome}) =>
    <div>
        <Input type="text" label="Nome" placeholder="Nome completo do atividade"
               name="nome" defaultValue={nome} autoFocus/>

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

    pageSize: {
        float: 'right',
        margin: 20,
        width: 80
    },

    newButton: {
        margin: 20
    },

    search: {
        width: '40%'
    }
}

export default Atividades