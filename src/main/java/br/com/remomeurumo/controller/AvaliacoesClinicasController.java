package br.com.remomeurumo.controller;

import static org.hibernate.criterion.MatchMode.ANYWHERE;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.framework.Result;
import br.com.remomeurumo.framework.ResultList;
import br.com.remomeurumo.model.Aluno;
import br.com.remomeurumo.model.AvaliacaoClinica;
import br.com.remomeurumo.model.ModeloAvaliacaoClinica;
import br.com.remomeurumo.model.TipoInfoClinica;

/**
 * @author jardim
 */
@RequestScoped
@Path("avaliacoesClinicas")
public class AvaliacoesClinicasController extends CrudController<AvaliacaoClinica> {

	@Override
	protected Class<AvaliacaoClinica> getType() {
		return AvaliacaoClinica.class;
	}

	@Override
	protected void postBlank(Result<AvaliacaoClinica> result) {
		result.addAssociation("modelos", findAll(ModeloAvaliacaoClinica.class));
		result.addAssociation("alunos", findAll(Aluno.class));
		result.addAssociation("tipos", findAll(TipoInfoClinica.class));
	}

	@Override
	protected void postLoad(Result<AvaliacaoClinica> result) {
		postBlank(result);
	}
	
	@GET
	@SuppressWarnings("unchecked")
	public ResultList<AvaliacaoClinica> list(
			@QueryParam("count") Integer count,
			@QueryParam("page") Integer page,
			@QueryParam("search.data") String data) {

		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(getType());
		Criteria countCriteria = session.createCriteria(getType());

		criteria.addOrder(Order.asc("data"));

		if (count != null) {
			criteria.setMaxResults(count);
		}

		if (count != null && page != null) {
			criteria.setFirstResult((page - 1) * count);
		}

		if (data != null) {
			criteria.add(Restrictions.ilike("data", data, ANYWHERE));
			countCriteria.add(Restrictions.ilike("data", data, ANYWHERE));
		}

		List<AvaliacaoClinica> list = criteria.list();
		Long totalResults = (Long) countCriteria.setProjection(Projections.rowCount()).uniqueResult();

		return new ResultList<>(list, page, count, totalResults.intValue());
	}
}
