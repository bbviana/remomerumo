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

import br.com.remomeurumo.Responsavel;
import br.com.remomeurumo.persistence.Transactional;

/**
 * @author jardim
 */
@ApplicationScoped
@Transactional
@Path("responsaveis")
@Produces(APPLICATION_JSON)
public class ResponsavelController {

	@Inject
	private EntityManager em;

	@POST
	@Consumes(APPLICATION_JSON)
	public Responsavel insert(Responsavel entity) {
		em.persist(entity);
		return entity;
	}

	@PUT
	@Path("{id}")
	@Consumes(APPLICATION_JSON)
	public Responsavel update(@PathParam("id") Long id, Responsavel responsavel) {
		return this.update(responsavel);
	}

	@GET
	@Path("{id}")
	public Responsavel get(@PathParam("id") Long id) {
		return this.find(id);
	}

	@GET
	public List<Responsavel> list() {
		TypedQuery<Responsavel> query = em.createQuery(
				"SELECT a FROM Responsavel a", Responsavel.class);
		return query.getResultList();
	}

	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		Responsavel entity = em.find(Responsavel.class, id);
		em.remove(entity);
	}

	public Responsavel update(Responsavel entity) {
		em.merge(entity);
		return entity;
	}

	public Responsavel find(Long id) {
		return em.find(Responsavel.class, id);
	}

}
