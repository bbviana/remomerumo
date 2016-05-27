import React, {Component, PropTypes} from 'react'
import {Button, Col, Glyphicon, Input, MenuItem, Modal, Nav, Navbar, NavBrand, NavItem, NavDropdown, Pagination,
        Row, Table} from 'react-bootstrap'
import {Form} from '../components'


class Crud extends Component {
    constructor(props){
        super(props)
        this.state = props.controller.state
    }

    // escuta alterações do state do controller e redesenha a tela
    componentDidMount = () => this.props.controller.listen(this)
    componentWillUnmount = () => this.props.controller.unlisten(this)

    render = ({controller, searchSchema, listSchema, formSchema, title} = this.props) =>
        <div style={styles.app}>
            <Header label={title} />

            <Content>
                <SearchSection controller={controller}
                               schema={searchSchema}
                               data={this.state.search}/>

                <ListSection controller={controller}
                             schema={listSchema}
                             list={this.state.list}
                             currentPage={this.state.currentPage}
                             totalPages={this.state.totalPages}
                             pageSize={this.state.pageSize}/>
                <NewButton controller={controller}
                label={title}/>
                
                <CsvButton controller={controller}
                           label={title}/>
            </Content>

            <FormSection controller={controller}
                         schema={formSchema}
                         show={this.state.showForm}
                         data={this.state.form}
                         associations={this.state.formAssociations}
                         title={title}/>
        </div>
}

const Header = ({label}) =>
    <Navbar fixedTop fluid inverse>
        <NavBrand>
            <a href="remomeurumo">Remo meu Rumo</a>
        </NavBrand>
        <Nav>
        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; {label}</NavItem>
        </Nav>
        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
            <NavItem eventKey={1} href="alunos">
                <Glyphicon glyph="fire"/>&nbsp;&nbsp;Alunos
            </NavItem>
            <NavItem eventKey={2} href="responsaveis">
                <Glyphicon glyph="eye-open"/>&nbsp;&nbsp;Responsáveis
            </NavItem>
            <NavItem eventKey={2} href="colaboradores">
                <Glyphicon glyph="education"/>&nbsp;&nbsp;Colaboradores
            </NavItem>
            <NavDropdown eventKey={3} title="Mais.." id="collapsible-navbar-dropdown">
            	<MenuItem eventKey="1" href="usuarios">
            		<Glyphicon glyph="user"/>&nbsp;&nbsp;Usuários
            	</MenuItem>
            	<MenuItem eventKey="2" href="permissoes">
            		<Glyphicon glyph="folder-open"/>&nbsp;&nbsp;Permissões
            	</MenuItem>
            	<MenuItem divider/>
		        <MenuItem eventKey="3" href="grupoAlunos">
		            <Glyphicon glyph="link"/>&nbsp;&nbsp;Grupo de Alunos
		        </MenuItem>
            	<MenuItem eventKey="4" href="atividades">
<<<<<<< HEAD
                    <Glyphicon glyph="flag"/>&nbsp;&nbsp;Banco de Atividades
=======
                    <Glyphicon glyph="flag"/>&nbsp;&nbsp;Plano de Aula
>>>>>>> 02152f2a43944212fac64b3f547ab4e733d0ea2d
                </MenuItem>
                <MenuItem eventKey="5" href="tipoAtividades">
                    <Glyphicon glyph="pencil"/>&nbsp;&nbsp;Modalidade
                </MenuItem>
                <MenuItem eventKey="15" href="tarefas">
                    <Glyphicon glyph="pushpin"/>&nbsp;&nbsp;Atividade
                </MenuItem>
                <MenuItem eventKey="15" href="equipamentos">
                    <Glyphicon glyph="pushpin"/>&nbsp;&nbsp;Equipamento
                </MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey="6" href="modeloAvaliacoesClinicas">
                    <Glyphicon glyph="road"/>&nbsp;&nbsp;Modelo de Avaliação
                </MenuItem>
                <MenuItem eventKey="7" href="tipoInfoClinicas">
                    <Glyphicon glyph="tags"/>&nbsp;&nbsp;Medidas
                </MenuItem>
                <MenuItem eventKey="8" href="avaliacoesClinicas">
                    <Glyphicon glyph="stats"/>&nbsp;&nbsp;Avaliação
                </MenuItem>
            </NavDropdown>
            <NavItem eventKey={2} href="login">
                <Glyphicon glyph="log-out"/>
            </NavItem>
        </Nav>
    </Navbar>


const Content = (props) =>
	<div style={styles.content}>
        {props.children}
	</div>


const SearchSection = ({controller, schema, data}) =>
    <Form onChange={controller.changeSearch} onSubmit={controller.list}>
        <Row>
            <Col md={4}>{schema(data)}</Col>
            <Col md={1}>
                <SearchButton />
            </Col>
        </Row>
    </Form>

const ListSection = ({controller, schema, list, currentPage, totalPages, pageSize}) =>
    <div>
        <Table striped hover>
            <thead>
                <tr>
                    {schema.header().props.children}
                    <th style={styles.actions}></th>
                </tr>
            </thead>
            <tbody>
            {list.map((element, i) =>
                <tr key={i}>
                    {schema.body(element).props.children}
                    <td>
                        <EditButton controller={controller} id={element.id} />
                        {schema.actions && schema.actions(element).props.children}
                        <RemoveButton controller={controller} id={element.id} />
                        <AuditButton controller={controller} id={element.id} />
                    </td>
                </tr>
            )}
            </tbody>
        </Table>

        <div>
            <Pagination style={styles.pagination}
                        items={totalPages}
                        activePage={currentPage}
                        onSelect={(event, {eventKey}) => controller.list({page: eventKey})}/>

            <PageSize controller={controller} pageSize={pageSize}/>
        </div>
    </div>

const PageSize = ({controller, pageSize}) =>
    <select style={styles.pageSize} className="form-control"
            value={pageSize}
            onChange={({target}) => controller.list({pageSize: target.value})}>
        <option value="5" >5</option>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
    </select>

const FormSection = ({controller, schema, data, associations, show, title}) =>
    <Modal show={show} onHide={controller.closeForm} bsSize="large">
        <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Form onChange={controller.changeForm} onSubmit={controller.save}>
            <Modal.Body>
                {schema(data, associations)}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={controller.closeForm}>Cancelar</Button>
                <Button bsStyle="primary" type="submit">Salvar</Button>
            </Modal.Footer>
        </Form>
    </Modal>


// Buttons

const SearchButton = () =>
    <Button bsStyle="primary" type="submit">
        <Glyphicon glyph="search"/> Buscar
    </Button>

const NewButton = ({controller, label}) =>
    <Button style={styles.newButton} bsStyle="primary" onClick={() => controller.blank()}>
        <Glyphicon glyph="plus-sign"/> Novo
    </Button>

const EditButton = ({controller, id}) =>
    <Button bsStyle="link" title="Editar" onClick={() => controller.load(id)}>
        <Glyphicon glyph="edit"/>
    </Button>

const RemoveButton = ({controller, id}) =>
    <Button bsStyle="link" title="Remover" onClick={() => controller.remove(id)}>
        <Glyphicon glyph="trash" />
    </Button>
const AuditButton = ({controller, id}) =>
    <Button bsStyle="link" title="Auditoria" onClick={() => controller.audit(id)}>
        <Glyphicon glyph="list-alt" />
    </Button>   
    
const CsvButton = ({controller, label}) =>
    <Button style={styles.csvButton} bsStyle="success" onClick={() => controller.csv()}>
        <Glyphicon glyph="menu-hamburger"/> .CSV
    </Button>


const styles = {
    actions: {
        width: 200
    },

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
    
    csvButton: {
        margin: 5
    }
}

export default Crud