package br.com.bbviana.laylamarques

import br.com.bbviana.laylamarques.categorias.Categoria
import br.com.bbviana.laylamarques.categorias.CategoriasController
import br.com.bbviana.laylamarques.itens.Item
import org.bson.types.ObjectId
import org.junit.Before
import org.junit.Test

import static org.junit.Assert.*

/**
 * @author bbviana
 */
class CategoriasTest extends BaseTest {

    private CategoriasController controller

    @Before
    void before() {
        activateRequestScoped()
        controller = this.instance(CategoriasController)
    }

    @Before
    void scenario() {
        populate(Categoria, [
                [id: id("a0"), nome: "cat_A"], // 0
                [id: id("a1"), nome: "cat_A1", categoriaPai: [id: id("a0")]], // 0,0
                [id: id("a2"), nome: "cat_A2", categoriaPai: [id: id("a0")]], // 0,1
                [id: id("a21"), nome: "cat_A21", categoriaPai: [id: id("a2")]], // 0,1,0
                [id: id("b0"), nome: "cat_B"] // 1
        ])

        populate(Item, [
                [id: id("0"), categoria: [id: id("b0")]]
        ])
    }

    @Test
    void listar_arvore() {
        def tree = controller.tree()

        assertNode tree, null, null, [
                [id: id("a0"), nome: "cat_A"],
                [id: id("b0"), nome: "cat_B"],
        ]

        // 0
        assertNode tree.subCategorias[0], id("a0"), "cat_A", [
                [id: id("a1"), nome: "cat_A1"],
                [id: id("a2"), nome: "cat_A2"],
        ]
        // 1
        assertNode tree.subCategorias[1], id("b0"), "cat_B", []
        // 0,0
        assertNode tree.subCategorias[0].subCategorias[0], id("a1"), "cat_A1", []
        // 0,1
        assertNode tree.subCategorias[0].subCategorias[1], id("a2"), "cat_A2", [
                [id: id("a21"), nome: "cat_A21"]
        ]
        // 0,1,0
        assertNode tree.subCategorias[0].subCategorias[1].subCategorias[0], id("a21"), "cat_A21", []
    }

    private static void assertNode(Categoria categoria, ObjectId id, String nome, List subCategorias) {
        assertEquals id, categoria.id
        assertEquals nome, categoria.nome

        assertEquals subCategorias.size(), categoria.subCategorias.size()
        for (int i = 0; i < subCategorias.size(); i++) {
            compare categoria.subCategorias[i], [id: subCategorias[i].id, nome: subCategorias[i].nome]
        }
    }


    @Test
    void nao_pode_apagar_categoria_com_itens() {
        controller.remove(id("a21")) // ok

        try {
            controller.remove(id("b0")) // possui itens, nao pode ser removido
            fail("Esperava IllegalArgumentException")
        } catch (IllegalArgumentException ignored) {
            assertTrue(true);
        }
    }

    @Test
    void nao_pode_apagar_categoria_com_subCategorias() {
        controller.remove(id("a21")) // ok

        try {
            controller.remove(id("a0")) // possui subCategorias, nao pode ser removido
            fail("Esperava IllegalArgumentException")
        } catch (IllegalArgumentException ignored) {
            assertTrue(true);
        }
    }

}
