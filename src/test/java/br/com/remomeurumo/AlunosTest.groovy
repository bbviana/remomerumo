package br.com.remomeurumo

import br.com.remomeurumo.test.BaseTest
import org.junit.After
import org.junit.Before
import org.junit.Test

import javax.ws.rs.client.Entity
import javax.ws.rs.core.Response

import static org.junit.Assert.assertNull

/**
 * @author bbviana
 */
class AlunosTest extends BaseTest {

    private AlunoController controller

    @Before
    void prepare() {
        controller = this.instance(AlunoController)

        populate(Aluno, [
                [nome: "Aluno 1"],
                [nome: "Aluno 2"]
        ])
    }

    @After
    void after() {
        cleanDataBase()
    }

    // [POST] /alunos
    @Test
    void "[POST] /alunos"() {
        Response response = target("alunos").request().post(Entity.json(new Aluno([nome: "Novo Aluno"])))
        Object json = toJson(response)
        compare(json, [id: 3L, nome: "Novo Aluno"])
        compare(find(Aluno, 3L), [id: 3L, nome: "Novo Aluno"])
    }

    @Test
    void "[PUT] /alunos/{id}"() {
        def template = [id: 1L, nome: "Aluno 1 editado"]
        Response response = target("alunos/1").request().put(Entity.json(template))
        Object json = toJson(response)
        compare(json, template)
        compare(find(Aluno, 1L), template)
    }

    @Test
    void "[GET] /alunos/{id}"() {
        Response response = target("alunos/1").request().get()
        Object json = toJson(response)
        compare(json, [id: 1L, nome: "Aluno 1"])
    }

    @Test
    void "[GET] /alunos"() {
        Response response = target("alunos").request().get()
        List listJson = toJson(response)
        compare(listJson, [
                [id: 1L, nome: "Aluno 1"],
                [id: 2L, nome: "Aluno 2"]
        ])
    }

    @Test
    void "[DELETE] /alunos/{id}"() {
        Response response = target("alunos/1").request().delete()
        assertNull find(Aluno, 1L)
    }
}
