package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import br.com.remomeurumo.Colaborador;
import br.com.remomeurumo.persistence.Transactional;

/**
 * @author jardim
 */
@ApplicationScoped
@Transactional
@Path("colaboradores")
@Produces(APPLICATION_JSON)
public class ColaboradoresController {

	@Inject
	private EntityManager em;

	@POST
	@Consumes(APPLICATION_JSON)
	public Colaborador insert(Colaborador entity) {
		em.persist(entity);
		return entity;
	}

	@PUT
	@Path("{id}")
	@Consumes(APPLICATION_JSON)
	public Colaborador update(@PathParam("id") Long id, Colaborador colaborador) {
		return this.update(colaborador);
	}

	@GET
	@Path("{id}")
	public Colaborador get(@PathParam("id") Long id) {
		return this.find(id);
	}

	@GET
	public List<Colaborador> list() {
		TypedQuery<Colaborador> query = em.createQuery(
				"SELECT a FROM Colaborador a", Colaborador.class);
		return query.getResultList();
	}

	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		Colaborador entity = em.find(Colaborador.class, id);
		em.remove(entity);
	}

	public Colaborador update(Colaborador entity) {
		em.merge(entity);
		return entity;
	}

	public Colaborador find(Long id) {
		return em.find(Colaborador.class, id);
	}

}
