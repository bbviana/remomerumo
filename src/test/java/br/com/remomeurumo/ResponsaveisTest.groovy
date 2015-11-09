package br.com.remomeurumo

import br.com.remomeurumo.model.Aluno
import br.com.remomeurumo.model.GrupoAluno
import br.com.remomeurumo.model.Responsavel
import br.com.remomeurumo.test.CrudTest

/**
 * @author jardim
 */
class ResponsaveisTest extends CrudTest {

    @Override
    void prepareCrud() {
        configure {
            cleanDataBaseAfterEachTest true
            url "responsaveis"
            entity Responsavel

            initialData(
                    [nome: "André"],
                    [nome: "Arthur"],
                    [nome: "Camila"],
                    [nome: "Jéssica"],
                    [nome: "Paula"],
            )

            strategy {
                insert([nome: "Novo Responsavel"])
                update data(index: 0) to([nome: "Responsavel editado"])
                search for: ["search.nome": "ss"] expect data(index: 3)
                search for: ["search.nome": "A"] expect data(index: 0..4)
                remove data(index: 1)
            }
        }
    }
}
