package br.com.remomeurumo

import br.com.remomeurumo.controller.AlunoController;
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

<<<<<<< HEAD
    private AlunosController controller
=======
    private AlunoController controller
	
	private ArrayList<Aluno> alunos
>>>>>>> Modelo geral

    @Before
    void prepare() {
        controller = this.instance(AlunosController)

        alunos = populate(Aluno, [
                [nome: "Aluno 1"],
                [nome: "Aluno 2"]
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
        Long id = json.getAt("id");
		compare(json, [id: id, nome: "Novo Aluno"])
        compare(find(Aluno, id), [id: id, nome: "Novo Aluno"])
    }

    @Test
    void "[PUT] /alunos/{id}"() {
        def template = [id: alunos.getAt(0).getId(), nome: "Aluno 1 editado"]
        Response response = target("alunos/1").request().put(Entity.json(template))
        Object json = toJson(response)
        compare(json, template)
        compare(find(Aluno, alunos.getAt(0).getId()), template)
    }

    @Test
    void "[GET] /alunos/{id}"() {
        Response response = target("alunos/"+alunos.getAt(0).getId()).request().get()
        Object json = toJson(response)
        compare(json, [id: alunos.getAt(0).getId(), nome: "Aluno 1"])
    }

    @Test
    void "[GET] /alunos"() {
        Response response = target("alunos").request().get()
        List listJson = toJson(response)
        compare(listJson, [
                [id: alunos.getAt(0).getId(), nome: "Aluno 1"],
                [id: alunos.getAt(1).getId(), nome: "Aluno 2"]
        ])
    }

    @Test
    void "[DELETE] /alunos/{id}"() {
        Response response = target("alunos/"+alunos.getAt(0).getId()).request().delete()
        assertNull find(Aluno, alunos.getAt(0).getId())
    }
}
