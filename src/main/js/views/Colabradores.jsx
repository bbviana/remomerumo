import React, {Component, PropTypes} from 'react'
import {ColaboradoresController} from '../controllers'
import {Button, Glyphicon, Input, Modal, Navbar, NavBrand, Pagination, Table} from 'react-bootstrap';
import {Form} from '../components'

class Colaboradores extends Component {
    state = ColaboradoresController.state

    componentDidMount(){
        ColaboradoresController.listen(this); // escuta alterações do state de ColaboradoresController e redesenha a tela
        ColaboradoresController.list(); // Busca inicial
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
                <Busca bean={this.state.search}/>

                <Lista list={this.state.colaboradores}
                       currentPage={this.state.currentPage}
                       totalPages={this.state.totalPages}
                       pageSize={this.state.pageSize}/>

                <Button style={styles.newButton} bsStyle="primary" onClick={() => ColaboradoresController.load(null)}>
                    <Glyphicon glyph="plus-sign"/> Novo Colaborador
                </Button>
            </Content>

            <Formulario show={this.state.showForm} bean={this.state.colaborador}/>
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
        <Form style={styles.search} onChange={ColaboradoresController.changeSearch} onSubmit={ColaboradoresController.list}>
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
                            <Acoes id={colaborador.id}/>
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
                        onChange={({target}) => ColaboradoresController.list({pageSize:target.value})}>
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
        <Button bsStyle="link" onClick={() => ColaboradoresController.load(id)}>
            <Glyphicon glyph="edit"/>
        </Button>

        <Button bsStyle="link" onClick={() => ColaboradoresController.remove(id)}>
            <Glyphicon glyph="trash" />
        </Button>
    </div>



class Formulario extends Component {
    render = ({show, bean} = this.props) =>
        <Modal show={show} onHide={ColaboradoresController.closeForm}>
            <Modal.Header>
                <Modal.Title>Aluno</Modal.Title>
            </Modal.Header>

            <Form onChange={ColaboradoresController.changeForm} onSubmit={ColaboradoresController.save}>
                <Modal.Body>
                    <FormularioContent {...bean}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={ColaboradoresController.closeForm}>Cancelar</Button>
                    <Button bsStyle="primary" type="submit">Salvar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
}

const FormularioContent = ({nome, apelido ,naturalDe ,dtNasc ,cpf ,rg ,endereco ,telefone ,celular ,email ,sapato ,bermuda ,camiseta}) =>
    <div>
        <Input type="text" label="Nome" placeholder="Nome completo do colaborador"
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

export default Colaboradores