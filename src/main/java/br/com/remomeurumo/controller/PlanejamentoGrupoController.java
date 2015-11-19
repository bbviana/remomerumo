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
import br.com.remomeurumo.model.Atividade;
import br.com.remomeurumo.model.Colaborador;
import br.com.remomeurumo.model.GrupoAluno;
import br.com.remomeurumo.model.PlanejamentoGrupo;

/**
 * @author jardim
 */
@RequestScoped
@Path("planejamentoGrupos")
public class PlanejamentoGrupoController extends
		CrudController<PlanejamentoGrupo> {

	protected Class<PlanejamentoGrupo> getType() {
		return PlanejamentoGrupo.class;
	}

	@Override
	protected void postBlank(Result<PlanejamentoGrupo> result) {
		result.addAssociation("alunos", findAll(Aluno.class));
		result.addAssociation("grupos", findAll(GrupoAluno.class));
		result.addAssociation("colaboradores", findAll(Colaborador.class));
		result.addAssociation("atividades", findAll(Atividade.class));
	}

	@Override
	protected void postLoad(Result<PlanejamentoGrupo> result) {
		postBlank(result);
	}
	
	@GET
	@SuppressWarnings("unchecked")
	public ResultList<PlanejamentoGrupo> list(
			@QueryParam("count") Integer count,
			@QueryParam("page") Integer page,
			@QueryParam("search.planejamentoDeAula") String planejamentoDeAula) {

		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(getType());
		Criteria countCriteria = session.createCriteria(getType());

		criteria.addOrder(Order.asc("planejamentoDeAula"));

		if (count != null) {
			criteria.setMaxResults(count);
		}

		if (count != null && page != null) {
			criteria.setFirstResult((page - 1) * count);
		}

		if (planejamentoDeAula != null) {
			criteria.add(Restrictions.ilike("planejamentoDeAula", planejamentoDeAula, ANYWHERE));
			countCriteria.add(Restrictions.ilike("planejamentoDeAula", planejamentoDeAula, ANYWHERE));
		}

		List<PlanejamentoGrupo> list = criteria.list();
		Long totalResults = (Long) countCriteria.setProjection(Projections.rowCount()).uniqueResult();

		return new ResultList<>(list, page, count, totalResults.intValue());
	}

}
