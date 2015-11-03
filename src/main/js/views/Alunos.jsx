import React, {Component, PropTypes} from 'react'
import {AlunosController} from '../controllers'
import {Button, Glyphicon, Input, Modal, Navbar, NavBrand, Pagination, Table} from 'react-bootstrap';
import {Form} from '../components'

class Alunos extends Component {
    state = AlunosController.state

    componentDidMount(){
        AlunosController.listen(this); // escuta alterações do state de AlunosController e redesenha a tela
        AlunosController.list(); // Busca inicial
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
                <Busca bean={this.state.search}/>

                <Lista list={this.state.alunos}
                       currentPage={this.state.currentPage}
                       totalPages={this.state.totalPages}
                       pageSize={this.state.pageSize}/>

                <Button style={styles.newButton} bsStyle="primary" onClick={() => AlunosController.load(null)}>
                    <Glyphicon glyph="plus-sign"/> Novo Aluno
                </Button>
            </Content>

            <Formulario show={this.state.showForm} bean={this.state.aluno}/>
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
        <Form style={styles.search} onChange={AlunosController.changeSearch} onSubmit={AlunosController.list}>
            <Input type="text" placeholder="Buscar por nome do Aluno" autoComplete="off"
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

            <div>
                <Pagination style={styles.pagination}
                            items={totalPages}
                            activePage={currentPage}
                            onSelect={this.handleSelectPage}/>

                <select style={styles.pageSize} className="form-control"
                        value={pageSize}
                        onChange={({target}) => AlunosController.list({pageSize:target.value})}>
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
        <Button bsStyle="link" onClick={() => AlunosController.load(id)}>
            <Glyphicon glyph="edit"/>
        </Button>

        <Button bsStyle="link" onClick={() => AlunosController.remove(id)}>
            <Glyphicon glyph="trash" />
        </Button>
    </div>



class Formulario extends Component {
    render = ({show, bean} = this.props) =>
        <Modal show={show} onHide={AlunosController.closeForm}>
            <Modal.Header>
                <Modal.Title>Aluno</Modal.Title>
            </Modal.Header>

            <Form onChange={AlunosController.changeForm} onSubmit={AlunosController.save}>
                <Modal.Body>
                    <FormularioContent {...bean}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={AlunosController.closeForm}>Cancelar</Button>
                    <Button bsStyle="primary" type="submit">Salvar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
}

const FormularioContent = ({nome, endereco}) =>
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

export default Alunos