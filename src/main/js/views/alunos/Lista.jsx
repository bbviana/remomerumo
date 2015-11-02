import React, {Component, PropTypes} from 'react'
import {Button, Glyphicon, Pagination, Table} from 'react-bootstrap';
import {AlunosController} from '../../controllers'


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
                                <AlunoActions id={aluno.id}/>
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



const AlunoActions = ({id}) =>
    <div>
        <Button bsStyle="link" onClick={() => AlunosController.load(id)}>
            <Glyphicon glyph="edit"/>
        </Button>

        <Button bsStyle="link" onClick={() => AlunosController.remove(id)}>
            <Glyphicon glyph="trash" />
        </Button>
    </div>


const styles = {
    pagination: {
        float: 'right'
    }
}

export default Lista