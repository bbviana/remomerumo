package br.com.remomeurumo.controller;

import br.com.remomeurumo.Aluno;
import br.com.remomeurumo.BaseController;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.ws.rs.*;
import java.util.List;

/**
 * @author bbviana
 */
@RequestScoped
@Path("alunos")
public class AlunosController extends BaseController {

	@Inject
	private EntityManager em;

	@POST
	public Aluno insert(Aluno aluno) {
		em.persist(aluno);
		return aluno;
	}

	@PUT
	@Path("{id}")
	public Aluno update(@PathParam("id") Long id, Aluno aluno) {
		// FIXME buscar aluno antes e fazer merge com o que vem da tela
		return em.merge(aluno);
	}

	@GET
	@Path("{id}")
	public Aluno get(@PathParam("id") Long id) {
		return em.find(Aluno.class, id);
	}

	@GET
	public List<Aluno> list(@QueryParam("count") Integer count, @QueryParam("page") Integer page) {
		TypedQuery<Aluno> query = em.createQuery("SELECT a FROM Aluno a ORDER BY nome", Aluno.class);

		if (count != null) {
			query.setMaxResults(count);
		}

		if (count != null && page != null) {
			query.setFirstResult((page - 1) * count);
		}

		return query.getResultList();
	}

	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		Aluno entity = em.find(Aluno.class, id);
		em.remove(entity);
	}
}
