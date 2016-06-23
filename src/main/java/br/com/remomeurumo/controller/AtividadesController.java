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
import br.com.remomeurumo.model.Atividade;
import br.com.remomeurumo.model.AtividadeGrupo;
import br.com.remomeurumo.model.TipoAtividade;

/**
 * @author bbviana
 */
@RequestScoped
@Path("atividades")
public class AtividadesController extends CrudController<Atividade> {

	protected Class<Atividade> getType() {
		return Atividade.class;
	}

	@Override
	protected void postBlank(Result<Atividade> result) {
		result.addAssociation("tipos", findAll(TipoAtividade.class));
		result.addAssociation("planejamentos", findAll(AtividadeGrupo.class));
	}

	@Override
	protected void postLoad(Result<Atividade> result) {
		postBlank(result);
	}
	
	@GET
	@SuppressWarnings("unchecked")
	public ResultList<Atividade> list(
			@QueryParam("count") Integer count,
			@QueryParam("page") Integer page,
			@QueryParam("search.nome") String nome) {

		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(getType());
		Criteria countCriteria = session.createCriteria(getType());

		criteria.addOrder(Order.desc("id"));

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

		List<Atividade> list = criteria.list();
		Long totalResults = (Long) countCriteria.setProjection(Projections.rowCount()).uniqueResult();

		return new ResultList<>(list, page, count, totalResults.intValue());
	}

}
