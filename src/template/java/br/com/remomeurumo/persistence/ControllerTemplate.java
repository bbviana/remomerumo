package br.com.bbviana.laylamarques.persistence;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * @author bbviana
 */
@Path("PATH")
@RequestScoped
@Produces(APPLICATION_JSON)
public class ControllerTemplate {

//    @Inject
//    private MainDAO mainDAO;

//    @POST
//    @Consumes(APPLICATION_JSON)
//    public Entity insert(Entity entity) {
//        return mainDAO.insert(entity);
//    }

//    @PUT
//    @Consumes(APPLICATION_JSON)
//    public Entity update(Entity entity) {
//        return mainDAO.update(entity);
//    }

//    @GET
//    @Path("{id}")
//    public Entity get(@PathParam("id") String id) {
//        return mainDAO.find(id);
//    }

//    @GET
//    public List<Entity> list() {
//        return mainDAO.list();
//    }

//    @DELETE
//    @Path("{id}")
//    public void remove(@PathParam("id") String id) {
//        mainDAO.remove(id);
//    }
}
