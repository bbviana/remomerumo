package br.com.remomeurumo.controller;

import br.com.remomeurumo.TipoAtividade;
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
@Path("tipoatividades")
public class TipoAtividadesController extends BaseController {


	@Inject
	private EntityManager em;

	@POST
	public TipoAtividade insert(TipoAtividade tipoAtividade) {
		em.persist(tipoAtividade);
		return tipoAtividade;
	}

	@PUT
	@Path("{id}")
	public TipoAtividade update(@PathParam("id") Long id, TipoAtividade tipoAtividade) {
		// FIXME buscar tipoAtividade antes e fazer merge com o que vem da tela
		return em.merge(tipoAtividade);
	}

	@GET
	@Path("{id}")
	public TipoAtividade get(@PathParam("id") Long id) {
		return em.find(TipoAtividade.class, id);
	}

	@GET
	public ResultList<TipoAtividade> list(
			@QueryParam("count") Integer count,
			@QueryParam("page") Integer page) {

		TypedQuery<TipoAtividade> query = em.createQuery("SELECT a FROM TipoAtividade a ORDER BY nome", TipoAtividade.class);

		if (count != null) {
			query.setMaxResults(count);
		}

		if (count != null && page != null) {
			query.setFirstResult((page - 1) * count);
		}

		List<TipoAtividade> list = query.getResultList();

		Long totalResults = em.createQuery("SELECT count(a) FROM TipoAtividade a", Long.class).getSingleResult();
		return new ResultList<>(list, totalResults);
	}

	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		TipoAtividade entity = em.find(TipoAtividade.class, id);
		em.remove(entity);
	}
}
