package br.com.remomeurumo

import br.com.remomeurumo.controller.AlunosController
import br.com.remomeurumo.controller.ResponsaveisController
import br.com.remomeurumo.test.BaseTest
import org.junit.After
import org.junit.Before
import org.junit.Test

import javax.ws.rs.client.Entity
import javax.ws.rs.core.Response

import static org.junit.Assert.assertEquals
import static org.junit.Assert.assertNull

/**
 * @author jardim
 */
class ResponsaveisTest extends BaseTest {

    private ResponsaveisController controller

    private List<Responsavel> responsaveis

    @Before
    void prepare() {
        controller = this.instance(ResponsaveisController)

        responsaveis = populate(Responsavel, [
                [nome: "Responsavel 1"],
                [nome: "Responsavel 2"],
                [nome: "Responsavel 3"],
                [nome: "Responsavel 4"],
                [nome: "Responsavel 5"],
        ])
    }

    @After
    void after() {
        cleanDataBase()
    }

    @Test
    void "[POST] /responsaveis"() {
        Response response = target("responsaveis").request().post(Entity.json(new Responsavel([nome: "Novo"])))
        Object json = toJson(response)
        Long id = json.id
        compare(json, [id: id, nome: "Novo"])
        compare(find(Responsavel, id), [id: id, nome: "Novo"])
    }

    @Test
    void "[PUT] /responsaveis/{id}"() {
        def template = [id: responsaveis[0].id, nome: "Editado"]
        Response response = target("responsaveis/1").request().put(Entity.json(template))
        Object json = toJson(response)
        compare(json, template)
        compare(find(Responsavel, responsaveis[0].id), template)
    }

    @Test
    void "[GET] /responsaveis/{id}"() {
        Response response = target("responsaveis/${responsaveis[0].id}").request().get()
        Object json = toJson(response)
        compare(json, [id: responsaveis[0].id, nome: "Responsavel 1"])
    }

    @Test
    void "[GET] /responsaveis"() {
        Response response = target("responsaveis").request().get()
        Object result = toJson(response)
        compare(result.list as List, [
                [id: responsaveis[0].id, nome: "Responsavel 1"],
                [id: responsaveis[1].id, nome: "Responsavel 2"],
                [id: responsaveis[2].id, nome: "Responsavel 3"],
                [id: responsaveis[3].id, nome: "Responsavel 4"],
                [id: responsaveis[4].id, nome: "Responsavel 5"]
        ])
    }

    @Test
    void "[GET] /responsaveis?count=2"() {
        Response response = target("responsaveis").queryParam("count", "2").request().get()
        Object result = toJson(response)
        compare(result.list as List, [
                [id: responsaveis[0].id, nome: "Responsavel 1"],
                [id: responsaveis[1].id, nome: "Responsavel 2"]
        ])
    }

    @Test
    void "[GET] /responsaveis?count=2&page=2"() {
        Response response = target("responsaveis")
                .queryParam("count", "2")
                .queryParam("page", "2")
                .request().get()
        Object result = toJson(response)
        compare(result.list as List, [
                [id: responsaveis[2].id, nome: "Responsavel 3"],
                [id: responsaveis[3].id, nome: "Responsavel 4"]
        ])
    }

    @Test
    void "[GET] /responsaveis?search.nome=3"() {
        Response response = target("responsaveis")
                .queryParam("search.nome", "3")
                .request().get()

        Object result = toJson(response)

        assertEquals 1, result.totalResults

        compare(result.list as List, [
                [id: responsaveis[2].id, nome: "Responsavel 3"]
        ])
    }

    @Test
    void "[GET] /responsaveis?search.nome=ESPON"() {
        Response response = target("responsaveis")
                .queryParam("search.nome", "ESPON")
                .request().get()

        Object result = toJson(response)

        assertEquals 5, result.totalResults

        compare(result.list as List, [
                [id: responsaveis[0].id, nome: "Responsavel 1"],
                [id: responsaveis[1].id, nome: "Responsavel 2"],
                [id: responsaveis[2].id, nome: "Responsavel 3"],
                [id: responsaveis[3].id, nome: "Responsavel 4"],
                [id: responsaveis[4].id, nome: "Responsavel 5"]
        ])
    }

    @Test
    void "[DELETE] /responsaveis/{id}"() {
        target("responsaveis/${responsaveis[0].id}").request().delete()
        assertNull find(Responsavel, responsaveis[0].id)
    }
}
