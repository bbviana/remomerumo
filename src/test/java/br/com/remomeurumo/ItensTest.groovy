package br.com.bbviana.laylamarques

import br.com.bbviana.laylamarques.categorias.Categoria
import br.com.bbviana.laylamarques.imagens.Imagem
import br.com.bbviana.laylamarques.itens.Item
import br.com.bbviana.laylamarques.itens.ItensController
import org.junit.Before
import org.junit.Test

import static org.junit.Assert.*

/**
 * @author bbviana
 */
class ItensTest extends BaseTest {

    private ItensController controller

    @Before
    void before() {
        activateRequestScoped()
        controller = this.instance ItensController
    }

    @Before
    void scenario() {
        populate(Categoria, [
                [id: id("0"), nome: "Desenhos"],
                [id: id("1"), nome: "Coleções"]
        ])

        populate(Imagem, [
                [id: id("0"), bytes: [0, 1]],
                [id: id("1"), bytes: [0, 2]]
        ])

        populate(Item, [
                [id: id("0"), titulo: "Aquarela 1", categoria: [id: id("0")], imagemID: id("0")],
                [id: id("1"), titulo: "Aquarela 2", categoria: [id: id("0")], imagemID: id("1")]
        ])
    }

    @Test
    void busca_item_e_imagem_nao_deve_vir() {
        assertNull "Ao carregar um Item, a Imagem não deveria ser carregada", controller.find(id("1")).imagem
    }

    @Test
    void ao_trocar_imagem_apagar_antiga_e_criar_nova() {
        def item = controller.find id("0") // imagem: 0
        item.imagemID = null // imagemID deve ser anulado pra indicar que a imagem foi trocada
        item.imagem = new Imagem(bytes: [2, 3, 4]) // nova imagem

        controller.save item

        def imagem = getDatastore().get(Imagem, id("0"))
        assertNull "imagem antiga deveria ter sido removida", imagem
        assertNotNull "imagemID deveria ter sido atribuido", item.imagemID
        assertEquals "imagemID deveria ser igual a imagem.id", item.imagem.id, item.imagemID
        compare getDatastore().get(Imagem, item.imagem.id), [bytes: [2, 3, 4] as byte[]]
    }

    @Test
    void cascatear_criacao_de_imagem() {
        def item = new Item(titulo: "Desenho X", imagem: [id: id("42"), bytes: [0, 4, 2]])

        controller.save item

        compare getDatastore().get(Imagem, id("42")), [bytes: [0, 4, 2] as byte[]]
    }

    @Test
    void ao_remover_item_remover_imagem() {
        compare controller.find(id("0")), [id: id("0"), titulo: "Aquarela 1"]

        controller.remove id("0")

        assertNull "item deveria ter sido removido", controller.find(id("0"))
        assertNull "imagem deveria ter sido removida também", getDatastore().get(Imagem, id("0"))
    }
}
