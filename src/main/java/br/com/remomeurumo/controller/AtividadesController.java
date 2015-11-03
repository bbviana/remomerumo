package br.com.remomeurumo.controller;

import br.com.remomeurumo.Atividade;
import br.com.remomeurumo.BaseController;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.ws.rs.*;
import java.util.List;

/**
 * @author jardim
 */
@RequestScoped
@Path("atividades")
public class AtividadesController extends BaseController {

	@Inject
	private EntityManager em;

	@POST
	public Atividade insert(Atividade atividade) {
		em.persist(atividade);
		return atividade;
	}

	@PUT
	@Path("{id}")
	public Atividade update(@PathParam("id") Long id, Atividade atividade) {
		// FIXME buscar atividade antes e fazer merge com o que vem da tela
		return em.merge(atividade);
	}

	@GET
	@Path("{id}")
	public Atividade get(@PathParam("id") Long id) {
		return em.find(Atividade.class, id);
	}

	@GET
	public ResultList<Atividade> list(@QueryParam("count") Integer count,
									  @QueryParam("page") Integer page) {

		TypedQuery<Atividade> query = em.createQuery(
				"SELECT a FROM Atividade a ORDER BY nome", Atividade.class);

		if (count != null) {
			query.setMaxResults(count);
		}

		if (count != null && page != null) {
			query.setFirstResult((page - 1) * count);
		}

		List<Atividade> list = query.getResultList();

		Integer totalResults = em.createQuery("SELECT count(a) FROM Atividade a",
				Long.class).getSingleResult().intValue();
		return new ResultList<>(list, 5, totalResults);
	}

	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		Atividade entity = em.find(Atividade.class, id);
		em.remove(entity);
	}
}
