package br.com.bbviana.laylamarques

import br.com.bbviana.laylamarques.categorias.Categoria
import br.com.bbviana.laylamarques.imagens.Imagem
import br.com.bbviana.laylamarques.imagens.Tipo
import br.com.bbviana.laylamarques.itens.Item
import com.google.gson.*
import com.google.gson.reflect.TypeToken
import org.bson.types.ObjectId
import org.junit.Before
import org.junit.Test

import java.lang.reflect.Type

/**
 * @author bbviana
 */
class DatabasePopulator extends BaseTest {

    @Before
    void clearEnviroment() {
        System.clearProperty("enviroment")
        getDatastore().getDB().dropDatabase()
    }

    @Test
    void populate() {
        backgrounds()
        imagens()
        categorias()
//        itens()
    }

    void backgrounds() {
        saveImage new File("database/bg"), Tipo.FUNDO
    }

    void imagens() {
        saveImage new File("database/img"), Tipo.NORMAL
    }


    void categorias() {
        insert(new TypeToken<Collection<Categoria>>() {}.getType(), "database/categorias.json")
    }

    void itens() {
        insert(new TypeToken<Collection<Item>>() {}.getType(), "database/itens.json")
    }

    ////////////////////////////////////////////////////////////////////////////////
    // UTILS
    ////////////////////////////////////////////////////////////////////////////////

    private void saveImage(File dir, Tipo tipo) {
        dir.listFiles().each {
            if (it.directory) {
                saveImage it, tipo
            } else {
                byte[] bytes = it.bytes
                String name = it.name.substring(0, it.name.length() - 4) // -.jpg

                def imagem = new Imagem([
                        id   : id(name),
                        bytes: bytes,
                        tipo : tipo
                ])

                getDatastore().save imagem
            }
        }
    }

    private void insert(Type type, String fileName) {
        def objects = parseJSON(type, fileName)
        objects.forEach({
            getDatastore().save(it)
        })
    }

    private static Collection parseJSON(Type type, String fileName) {
        def gson = new GsonBuilder()
        gson.registerTypeAdapter(ObjectId, new ObjectIdDeserializer())

        def json = new File(fileName).text
        return gson.create().fromJson(json, type)
    }

    private static class ObjectIdDeserializer implements JsonDeserializer<ObjectId> {

        public ObjectId deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
                throws JsonParseException {
            return new ObjectId(json.getAsJsonPrimitive().getAsString());
        }
    }
}
