package br.com.remomeurumo.controller;

import br.com.remomeurumo.Aluno;
import br.com.remomeurumo.BaseController;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.*;
import java.util.List;

import static org.hibernate.criterion.MatchMode.ANYWHERE;

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
	public ResultList<Aluno> list(
			@QueryParam("count") Integer count,
			@QueryParam("page") Integer page,
			@QueryParam("search.nome") String nome) {

		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(Aluno.class);
		Criteria countCriteria = session.createCriteria(Aluno.class);

		criteria.addOrder(Order.asc("nome"));

		if (count != null) {
			criteria.setMaxResults(count);
		}

		if (count != null && page != null) {
			criteria.setFirstResult((page - 1) * count);
		}

		if (nome != null) {
			criteria.add(Restrictions.ilike("nome", nome, ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", nome, ANYWHERE));
		}

		List<Aluno> list = criteria.list();
		Long totalResults = (Long) countCriteria.setProjection(Projections.rowCount()).uniqueResult();

		return new ResultList<>(list, totalResults);
	}

	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		Aluno entity = em.find(Aluno.class, id);
		em.remove(entity);
	}
}
