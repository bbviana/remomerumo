package br.com.bbviana.laylamarques

import br.com.bbviana.laylamarques.categorias.Categoria
import br.com.bbviana.laylamarques.imagens.Imagem
import br.com.bbviana.laylamarques.imagens.Tipo
import br.com.bbviana.laylamarques.itens.Item
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.Before
import org.junit.Test

import javax.ws.rs.core.GenericType

/**
 * @author bbviana
 */
class WebServicesTest extends BaseTest {

    @Before
    void scenario() {
        populate(Categoria, [
                [id: id("0"), nome: "Desenhos"],
                [id: id("1"), nome: "Coleções"],
                [id: id("11"), nome: "Verão 2015", categoriaPai: [id: id("1")]],
        ])

        populate(Imagem, [
                [id: id("0"), bytes: [0, 1]],
                [id: id("1"), bytes: [0, 2]]
        ])

        populate(Imagem, [
                [id: id("100"), bytes: [1, 0, 0], tipo: Tipo.FUNDO],
                [id: id("101"), bytes: [1, 0, 1], tipo: Tipo.FUNDO],
                [id: id("102"), bytes: [1, 0, 2], tipo: Tipo.FUNDO]
        ])

        populate(Item, [
                [id: id("0"), titulo: "Aquarela 1", categoria: [id: id("0")], imagemID: id("0")],
                [id: id("1"), titulo: "Aquarela 2", categoria: [id: id("0")], imagemID: id("1")]
        ])
    }

    @Test
    void backgrounds() {
        def response = target("imagens/backgrounds").request().get()

        println convertStreamToString(response.entity)
    }

    @Test
    void categorias() {
        def response = target("categorias").request().get()
        println convertStreamToString(response.entity)
    }

    @Test
    void categoria() {
        def response = target("categorias/" + id("0")).request().get()
        println convertStreamToString(response.entity)
    }

    @Test
    void itens() {
        def response = target("itens").request().get()
        println convertStreamToString(response.entity)
    }

    static String convertStreamToString(InputStream is) {
        Scanner s = new Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }
}
