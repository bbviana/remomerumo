package br.com.remomeurumo

import br.com.remomeurumo.controller.ResponsavelController;
import br.com.remomeurumo.test.BaseTest

import org.junit.After
import org.junit.Before
import org.junit.Test

import javax.ws.rs.client.Entity
import javax.ws.rs.core.Response

import static org.junit.Assert.assertNull

/**
 * @author jardim
 */
class ResponsaveisTest extends BaseTest {

    private ResponsavelController controller

    @Before
    void prepare() {
        controller = this.instance(ResponsavelController)

        populate(Responsavel, [
                [nome: "Responsavel 1"],
                [nome: "Responsavel 2"]
        ])
    }

    @After
    void after() {
        cleanDataBase()
    }

    // [POST] /responsaveis
    @Test
    void "[POST] /responsaveis"() {
        Response response = target("responsaveis").request().post(Entity.json(new Responsavel([nome: "Novo Responsavel"])))
        Object json = toJson(response)
        compare(json, [id: 3L, nome: "Novo Responsavel"])
        compare(find(Responsavel, 3L), [id: 3L, nome: "Novo Responsavel"])
    }

    @Test
    void "[PUT] /responsaveis/{id}"() {
        def template = [id: 1L, nome: "Responsavel 1 editado"]
        Response response = target("responsaveis/1").request().put(Entity.json(template))
        Object json = toJson(response)
        compare(json, template)
        compare(find(Responsavel, 1L), template)
    }

    @Test
    void "[GET] /responsaveis/{id}"() {
        Response response = target("responsaveis/1").request().get()
        Object json = toJson(response)
        compare(json, [id: 1L, nome: "Responsavel 1"])
    }

    @Test
    void "[GET] /responsaveis"() {
        Response response = target("responsaveis").request().get()
        List listJson = toJson(response)
        compare(listJson, [
                [id: 1L, nome: "Responsavel 1"],
                [id: 2L, nome: "Responsavel 2"]
        ])
    }

    @Test
    void "[DELETE] /responsaveis/{id}"() {
        Response response = target("responsaveis/1").request().delete()
        assertNull find(Responsavel, 1L)
    }
}
