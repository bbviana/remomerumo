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
                <th>Email</th>
                <th>Telefone</th>
                <th>Celular</th>
            </tr>,

        body: (aluno) =>
            <tr>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.endereco}</td>
				<td>{aluno.email}</td>
                <td>{aluno.telefone}</td>
                <td>{aluno.celular}</td>
            </tr>
    }

    formSchema = (aluno) =>
        <div>
            <Input type="text" label="Nome" placeholder="Nome completo do aluno" name="nome" defaultValue={aluno.nome} autoFocus/>
            <Input type="text" name="apelido" defaultValue={aluno.apelido} label="Apelido" placeholder="Apelido"  />
            <Input type="text" name="naturalDe" defaultValue={aluno.naturalDe} label="Natural de" placeholder="Cidade - estado"  />
            <Input type="text" name="dtNasc" defaultValue={aluno.dtNasc} label="Data de Nascimento" placeholder="dd/mm/aaaa"  />
            <Input type="text" name="cpf" defaultValue={aluno.cpf} label="CPF" placeholder="Documento CPF"  />
            <Input type="text" name="rg" defaultValue={aluno.rg} label="RG" placeholder="Documento RG"  />
            <Input type="text" name="endereco" defaultValue={aluno.endereco} label="Endereço" placeholder="Rua, número"  />
            <Input type="text" name="telefone" defaultValue={aluno.telefone} label="Telefone" placeholder="Telefone Fixo"  />
            <Input type="text" name="celular" defaultValue={aluno.celular} label="Celular" placeholder="Celular com ddd"  />
            <Input type="text" name="email" defaultValue={aluno.email} label="Email" placeholder="Email para contato"  />
            <Input type="text" name="sapato" defaultValue={aluno.sapato} label="Sapato" placeholder="Tamanho da sapato"  />
            <Input type="text" name="bermuda" defaultValue={aluno.bermuda} label="Bermuda" placeholder="Tamanho da bermuda"  />
            <Input type="text" name="camiseta" defaultValue={aluno.camiseta} label="Camiseta" placeholder="Tamanho da camiseta"  />
        </div>

    render = () =>
        <Crud title="Aluno"
              controller={AlunosController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}

export default Alunos