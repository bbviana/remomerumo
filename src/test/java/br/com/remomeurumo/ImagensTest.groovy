package br.com.bbviana.laylamarques

import br.com.bbviana.laylamarques.categorias.Categoria
import br.com.bbviana.laylamarques.imagens.Imagem
import groovy.json.JsonOutput
import org.junit.Test

import javax.ws.rs.client.Entity
import javax.ws.rs.core.GenericType

import static org.junit.Assert.assertEquals

/**
 * @author bbviana
 */
class ImagensTest extends BaseTest {

    @Test
    void list() {
        byte[] bytes= new File("database/categorias.json").bytes

        def imagem = new Imagem()
        imagem.bytes = bytes

        getDatastore().save imagem

        println "pause"
    }

}
