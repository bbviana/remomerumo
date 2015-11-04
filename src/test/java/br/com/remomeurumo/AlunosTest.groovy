package br.com.remomeurumo

import br.com.remomeurumo.controller.AlunosController
import br.com.remomeurumo.test.BaseTest
import org.junit.After
import org.junit.Before
import org.junit.Test

import javax.ws.rs.client.Entity
import javax.ws.rs.core.Response

import static org.junit.Assert.assertEquals
import static org.junit.Assert.assertNull

/**
 * @author bbviana
 */
class AlunosTest extends BaseTest {

    private AlunosController controller

    private List<Aluno> alunos

    @Before
    void prepare() {
        controller = this.instance(AlunosController)

        alunos = populate(Aluno, [
                [nome: "Aluno 1"],
                [nome: "Aluno 2"],
                [nome: "Aluno 3"],
                [nome: "Aluno 4"],
                [nome: "Aluno 5"],
        ])
    }

    @After
    void after() {
        cleanDataBase()
    }

    @Test
    void "[POST] /alunos"() {
        Response response = target("alunos").request().post(Entity.json(new Aluno([nome: "Novo Aluno"])))
        Object json = toJson(response)
        Long id = json.id
        compare(json, [id: id, nome: "Novo Aluno"])
        compare(find(Aluno, id), [id: id, nome: "Novo Aluno"])
    }

    @Test
    void "[PUT] /alunos/{id}"() {
        def template = [id: alunos[0].id, nome: "Aluno 1 editado"]
        Response response = target("alunos/1").request().put(Entity.json(template))
        Object json = toJson(response)
        compare(json, template)
        compare(find(Aluno, alunos[0].id), template)
    }

   // @Test
    void "[GET] /alunos/{id}"() {
        Response response = target("alunos/${alunos[0].id}").request().get()
        Object json = toJson(response)
        compare(json, [id: alunos[0].id, nome: "Aluno 1"])
    }

 //   @Test
    void "[GET] /alunos"() {
        Response response = target("alunos").request().get()
        Object result = toJson(response)
        compare(result.list as List, [
                [id: alunos[0].id, nome: "Aluno 1"],
                [id: alunos[1].id, nome: "Aluno 2"],
                [id: alunos[2].id, nome: "Aluno 3"],
                [id: alunos[3].id, nome: "Aluno 4"],
                [id: alunos[4].id, nome: "Aluno 5"]
        ])
    }

   // @Test
    void "[GET] /alunos?count=2"() {
        Response response = target("alunos").queryParam("count", "2").request().get()
        Object result = toJson(response)
        compare(result.list as List, [
                [id: alunos[0].id, nome: "Aluno 1"],
                [id: alunos[1].id, nome: "Aluno 2"]
        ])
    }

  //  @Test
    void "[GET] /alunos?count=2&page=2"() {
        Response response = target("alunos")
                .queryParam("count", "2")
                .queryParam("page", "2")
                .request().get()
        Object result = toJson(response)
        compare(result.list as List, [
                [id: alunos[2].id, nome: "Aluno 3"],
                [id: alunos[3].id, nome: "Aluno 4"]
        ])
    }

  //  @Test
    void "[GET] /alunos?search.nome=3"() {
        Response response = target("alunos")
                .queryParam("search.nome", "3")
                .request().get()

        Object result = toJson(response)

        assertEquals 1, result.totalResults

        compare(result.list as List, [
                [id: alunos[2].id, nome: "Aluno 3"]
        ])
    }

  //  @Test
    void "[GET] /alunos?search.nome=LUNO"() {
        Response response = target("alunos")
                .queryParam("search.nome", "LUNO")
                .request().get()

        Object result = toJson(response)

        assertEquals 5, result.totalResults

        compare(result.list as List, [
                [id: alunos[0].id, nome: "Aluno 1"],
                [id: alunos[1].id, nome: "Aluno 2"],
                [id: alunos[2].id, nome: "Aluno 3"],
                [id: alunos[3].id, nome: "Aluno 4"],
                [id: alunos[4].id, nome: "Aluno 5"]
        ])
    }

    @Test
    void "[DELETE] /alunos/{id}"() {
        Response response = target("alunos/${alunos[0].id}").request().delete()
        assertNull find(Aluno, alunos[0].id)
    }
}
