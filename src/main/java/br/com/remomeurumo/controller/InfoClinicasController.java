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
import br.com.remomeurumo.model.AvaliacaoClinica;
import br.com.remomeurumo.model.InfoClinica;
import br.com.remomeurumo.model.TipoInfoClinica;

/**
 * @author jardim
 */
@RequestScoped
@Path("infoClinicas")
public class InfoClinicasController extends CrudController<InfoClinica> {

	@Override
	protected Class<InfoClinica> getType() {
		return InfoClinica.class;
	}
	
	@Override
	protected void postBlank(Result<InfoClinica> result) {
		result.addAssociation("tipos", findAll(TipoInfoClinica.class));
	}

	@Override
	protected void postLoad(Result<InfoClinica> result) {
		postBlank(result);
	}
	
	@GET
	@SuppressWarnings("unchecked")
	public ResultList<InfoClinica> list(
			@QueryParam("count") Integer count,
			@QueryParam("page") Integer page,
			@QueryParam("search.valor") String valor) {

		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(getType());
		Criteria countCriteria = session.createCriteria(getType());

		criteria.addOrder(Order.asc("valor"));

		if (count != null) {
			criteria.setMaxResults(count);
		}

		if (count != null && page != null) {
			criteria.setFirstResult((page - 1) * count);
		}

		if (valor != null) {
			criteria.add(Restrictions.ilike("nome", valor, ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", valor, ANYWHERE));
		}

		List<InfoClinica> list = criteria.list();
		Long totalResults = (Long) countCriteria.setProjection(Projections.rowCount()).uniqueResult();

		return new ResultList<>(list, page, count, totalResults.intValue());
	}

}
