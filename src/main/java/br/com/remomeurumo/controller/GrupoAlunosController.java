package br.com.remomeurumo.controller;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;

import br.com.remomeurumo.BaseController;
import br.com.remomeurumo.GrupoAluno;

/**
 * @author jardim
 */
@RequestScoped
@Path("grupoalunos")
public class GrupoAlunosController extends BaseController {


	@Inject
	private EntityManager em;

	@POST
	public GrupoAluno insert(GrupoAluno grupoAluno) {
		em.persist(grupoAluno);
		return grupoAluno;
	}

	@PUT
	@Path("{id}")
	public GrupoAluno update(@PathParam("id") Long id, GrupoAluno grupoAluno) {
		// FIXME buscar aluno antes e fazer merge com o que vem da tela
		return em.merge(grupoAluno);
	}

	@GET
	@Path("{id}")
	public GrupoAluno get(@PathParam("id") Long id) {
		return em.find(GrupoAluno.class, id);
	}

	@GET
	public ResultList<GrupoAluno> list(
			@QueryParam("count") Integer count,
			@QueryParam("page") Integer page) {

		TypedQuery<GrupoAluno> query = em.createQuery("SELECT a FROM GrupoAluno a ORDER BY nome", GrupoAluno.class);

		if (count != null) {
			query.setMaxResults(count);
		}

		if (count != null && page != null) {
			query.setFirstResult((page - 1) * count);
		}

		List<GrupoAluno> list = query.getResultList();

		Long totalResults = em.createQuery("SELECT count(a) FROM GrupoAluno a", Long.class).getSingleResult();
		return new ResultList<>(list, totalResults);
	}

	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		GrupoAluno entity = em.find(GrupoAluno.class, id);
		em.remove(entity);
	}
}
