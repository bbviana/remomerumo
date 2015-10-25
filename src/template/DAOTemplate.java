package br.com.bbviana.laylamarques.persistence;

import br.com.bbviana.laylamarques.imagens.Imagem;
import br.com.bbviana.laylamarques.interceptor.Log;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

/**
 * @author bbviana
 */
@Log
@ApplicationScoped
public class DAOTemplate {

    @Inject
    private Datastore ds;

//    public Entity insert(Entity entity) {
//        ds.save(entity);
//        return entity;
//    }

//    public Entity update(Entity entity) {
//        ds.save(entity);
//        return entity;
//    }

//    public List<Entity> list() {
//        return ds.find(Entity.class).asList();
//    }

//    public Entity find(String id) {
//        try {
//            return ds.get(Entity.class, new ObjectId(id));
//        } catch (Exception e) {
//            throw new IllegalArgumentException(String.format("Imagem %s inexistente", id));
//        }
//    }

//    public void remove(String id) {
//        Entity entity = ds.get(Entity.class, new ObjectId(id));
//        ds.delete(entity);
//    }
}
