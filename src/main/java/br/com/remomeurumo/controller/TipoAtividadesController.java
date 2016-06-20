package br.com.remomeurumo.controller;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.framework.Result;
import br.com.remomeurumo.model.TipoAtividade;

/**
 * @author bbviana
 */
@RequestScoped
@Path("tipoAtividades")
public class TipoAtividadesController extends CrudController<TipoAtividade> {

	protected Class<TipoAtividade> getType() {
		return TipoAtividade.class;
	}
	
	@Override
	protected void postBlank(Result<TipoAtividade> result) {
		
		//só lista os grupos que não tem pai para não criar hieraquia com avôs
		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(TipoAtividade.class);
		criteria.add(Restrictions.isNull("tipoAtividadePai"));
		criteria.addOrder(Order.desc("nome"));
		List<TipoAtividade> list = criteria.list();
		result.addAssociation("tipos", list);
	}

	@Override
	protected void postLoad(Result<TipoAtividade> result) {
		postBlank(result);
	}
}
