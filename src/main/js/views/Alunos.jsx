import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {AlunosController} from '../controllers'
import {Input} from 'react-bootstrap';

class Alunos extends Component {
    componentDidMount = () => AlunosController.list() // Busca inicial

    searchSchema = (search) =>
        <Input type="text" placeholder="Buscar por nome do Aluno" autoComplete="off"
               name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Endereço</th>
            </tr>,

        body: (aluno) =>
            <tr>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.endereco}</td>
            </tr>
    }

    formSchema = (aluno) =>
        <div>
            <Input type="text" label="Nome" placeholder="Nome completo do aluno"
                   name="nome" defaultValue={aluno.nome} autoFocus/>

            <Input type="text" label="Endereço" placeholder="Rua, número"
                   name="endereco" defaultValue={aluno.endereco} />
        </div>

    render = () =>
        <Crud title="Aluno"
              controller={AlunosController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Alunos