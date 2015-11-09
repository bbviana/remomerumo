package br.com.remomeurumo

import br.com.remomeurumo.model.Aluno
import br.com.remomeurumo.model.GrupoAluno
import br.com.remomeurumo.model.Responsavel
import br.com.remomeurumo.test.CrudTest

/**
 * @author bbviana
 */
class AlunosTest extends CrudTest {

    @Override
    void prepareCrud() {
        configure {
            cleanDataBaseAfterEachTest true
            url "alunos"
            entity Aluno

            def grupos = populate(GrupoAluno, [
                [nome: "Grupo 1"],
                [nome: "Grupo 2"],
            ])

            def responsaveis = populate(Responsavel, [
                    [nome: "André"],
                    [nome: "Paula"],
            ])

            initialData(
                    [nome: "Aluno 0"],
                    [nome: "Aluno 1"],
                    [nome: "Aluno 2"],
                    [nome: "Aluno 3"],
                    [nome: "Aluno 4"],
            )

            strategy {
                insert([nome: "Novo Aluno"])
                update data(index: 0) to([nome: "Aluno editado"])
                search for: ["search.nome": "3"] expect data(index: 3)
                search for: ["search.nome": "LUN"] expect data(index: 0..4)
                remove data(index: 1)
            }
        }
    }
}
